import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

interface AuthPageProps {
  mode: 'login' | 'register';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: mode === 'login' ? 'poorni@ecompulse.com' : '',
    password: '1234',
  });

  const isLogin = mode === 'login';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login({
          email: form.email || undefined,
          password: form.password,
        });
      } else {
        await register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }

      navigate('/dashboard');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-brand-row">
            <div className="logo-mark auth-logo-mark">E</div>
            <span>EcomPulse</span>
          </div>
          <div className="auth-visual-copy">
            <p className="auth-eyebrow">Commerce operations / 01</p>
            <h1>Make every order count.</h1>
            <p>One clear view of the work that keeps your store moving.</p>
          </div>
          <div className="auth-insight-panel">
            <div className="auth-insight-header">
              <span>Today at a glance</span>
              <span className="auth-live-indicator"><i /> Live</span>
            </div>
            <div className="auth-insight-value">$24,680</div>
            <div className="auth-insight-meta">
              <span>Revenue this month</span>
              <strong>+18.4%</strong>
            </div>
            <div className="auth-chart" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
            </div>
          </div>
          <div className="auth-visual-footer">
            <span>Built for focused teams</span>
            <span>© 2024 EcomPulse</span>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-form-heading">
            <p className="auth-eyebrow">{isLogin ? 'Welcome back' : 'New workspace'}</p>
            <h2>{isLogin ? 'Sign in to your account' : 'Create your account'}</h2>
            <p className="muted">{isLogin ? 'Enter your details to continue to EcomPulse.' : 'Set up your workspace and start managing your store.'}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin ? (
              <div className="form-field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  className="text-input"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Jane Smith"
                />
              </div>
            ) : null}

            <div className="form-field">
              <label htmlFor="email">Work email</label>
              <input
                id="email"
                type="email"
                className="text-input"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="admin@ecompulse.com"
              />
            </div>

            <div className="form-field">
              <div className="form-label-row">
                <label htmlFor="password">Password</label>
                {isLogin ? <a href="#password-help">Forgot password?</a> : null}
              </div>
              <input
                id="password"
                type="password"
                className="text-input"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder="••••••••"
              />
            </div>

            {error ? <div className="status-badge status-danger">{error}</div> : null}

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : isLogin ? 'Continue to dashboard' : 'Create workspace'}
            </Button>
          </form>

          <div className="auth-footer">
            {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
            <Link className="inline-link" to={isLogin ? '/register' : '/login'}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
