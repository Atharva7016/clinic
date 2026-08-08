/**
 * Admin auth context — single doctor JWT session.
 * Token in localStorage (or sessionStorage when Remember Me is off).
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import api from '../../services/api';
import { adminLogin, adminLogout, adminMe } from '../services/adminApi';

const AuthContext = createContext(null);

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

const readStore = (remembered) =>
  remembered ? localStorage : sessionStorage;

function loadSession() {
  const token =
    localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  let user = null;
  try {
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }
  return { token, user };
}

function decodeExp(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** Keep Axios Authorization in sync with the active admin session. */
function applyAuthHeader(token) {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  }
}

export function AdminAuthProvider({ children }) {
  const initial = loadSession();
  const [{ token, user }, setSession] = useState(initial);
  const [booting, setBooting] = useState(Boolean(initial.token));
  /** Bumps on login/logout so stale /me responses cannot wipe a new session. */
  const sessionGen = useRef(0);
  /** After login we already trust the token — skip the boot /me round-trip. */
  const skipBootRef = useRef(false);

  const clearSession = useCallback(() => {
    sessionGen.current += 1;
    skipBootRef.current = false;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    applyAuthHeader(null);
    setSession({ token: null, user: null });
    setBooting(false);
  }, []);

  const persistSession = useCallback((nextToken, nextUser, rememberMe) => {
    sessionGen.current += 1;
    skipBootRef.current = true;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    const store = readStore(rememberMe);
    store.setItem(TOKEN_KEY, nextToken);
    store.setItem(USER_KEY, JSON.stringify(nextUser));
    applyAuthHeader(nextToken);
    setSession({ token: nextToken, user: nextUser });
    setBooting(false);
  }, []);

  const login = useCallback(
    async ({ email, password, rememberMe }) => {
      const res = await adminLogin({ email, password, rememberMe });
      const { token: nextToken, user: nextUser } = res.data || {};

      if (!nextToken) {
        throw new Error('Login succeeded but no token was returned.');
      }

      persistSession(nextToken, nextUser, Boolean(rememberMe));
      return res;
    },
    [persistSession]
  );

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch {
      /* ignore network errors on logout */
    }
    clearSession();
  }, [clearSession]);

  // Validate token on cold load / refresh only (not right after login)
  useEffect(() => {
    let cancelled = false;
    let timer;
    const genAtStart = sessionGen.current;

    const boot = async () => {
      if (!token) {
        applyAuthHeader(null);
        if (!cancelled) setBooting(false);
        return;
      }

      // Fresh login — token already verified by /login; do not re-fetch /me
      if (skipBootRef.current) {
        skipBootRef.current = false;
        applyAuthHeader(token);
        if (!cancelled) setBooting(false);
        return;
      }

      const exp = decodeExp(token);
      if (exp && Date.now() >= exp) {
        if (!cancelled && sessionGen.current === genAtStart) clearSession();
        return;
      }

      applyAuthHeader(token);
      if (!cancelled) setBooting(true);

      try {
        const res = await adminMe();
        if (cancelled || sessionGen.current !== genAtStart) return;
        setSession((prev) => ({ ...prev, user: res.data }));
        if (exp) {
          timer = setTimeout(() => {
            if (sessionGen.current === genAtStart) clearSession();
          }, Math.max(exp - Date.now(), 0));
        }
      } catch (err) {
        // Only wipe session on hard auth failure — keep JWT on transient errors
        const status = err?.status;
        if (
          !cancelled &&
          sessionGen.current === genAtStart &&
          (status === 401 || status === 403)
        ) {
          clearSession();
          return;
        }
      } finally {
        if (!cancelled && sessionGen.current === genAtStart) {
          setBooting(false);
        }
      }
    };

    boot();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [token, clearSession]);

  // Sync header if a token exists on first mount
  useEffect(() => {
    if (initial.token) applyAuthHeader(initial.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      booting,
      login,
      logout,
      clearSession,
    }),
    [token, user, booting, login, logout, clearSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
