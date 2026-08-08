/**
 * Catches React render errors and shows a recovery UI instead of a blank screen.
 */
import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'Something went wrong.',
    };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary:', error, info);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center"
        role="alert"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Unexpected error
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          We hit a snag
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          {this.state.message ||
            'The page failed to load. You can retry or return home.'}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
