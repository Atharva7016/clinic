/**
 * Legacy Marathi appointment route — sets lang to mr and redirects to /appointment.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function AppointmentMr() {
  const { setLang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    setLang('mr');
    navigate('/appointment', { replace: true });
  }, [setLang, navigate]);

  return null;
}

export default AppointmentMr;
