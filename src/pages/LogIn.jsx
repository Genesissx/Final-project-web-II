import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="form-field">
      <label className="field-label">{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => setToast({ message: "", type: "" }), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const validateEmail = (value) => {
    if (!value) return false;
    return /^\S+@\S+\.\S+$/.test(value);
  };

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email requis";
    else if (!validateEmail(email.trim())) nextErrors.email = "Email invalide";
    if (!password) nextErrors.password = "Mot de passe requis";
    return nextErrors;
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    showToast("Connexion réussie !", "success");
    setTimeout(() => navigate("/home"), 900);
  };

  const handleGoogleSignIn = () => {
    showToast("Connexion Google réussie !", "success");
    setTimeout(() => navigate("/home"), 900);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setErrors((previous) => ({ ...previous, email: "" }));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setErrors((previous) => ({ ...previous, password: "" }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {toast.message && <div className={`toast ${toast.type}`}>{toast.message}</div>}
        <div className="brand-card">
          <div className="brand-mark">SC</div>
          <div>
            <h1 className="brand-title">Service Connect</h1>
            <p className="brand-subtitle">Accédez aux meilleurs services en Haïti.</p>
          </div>
        </div>

        <div className="auth-header">
          <h2>Bienvenue  👋</h2>
          <p>Connectez-vous pour continuer vers votre espace utilisateur.</p>
        </div>

        <FormField label="Adresse email" error={errors.email}>
          <input
            className={`auth-input ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="jean@exemple.com"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
          />
        </FormField>

        <FormField label="Mot de passe" error={errors.password}>
          <div className="password-row">
            <input
              className={`auth-input ${errors.password ? "error" : ""}`}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => handlePasswordChange(event.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPw((current) => !current)}
            >
              <EyeIcon open={showPw} />
            </button>
          </div>
        </FormField>

        <button className="btn-primary" type="button" onClick={handleSubmit}>
          Se connecter
        </button>

        <div className="divider-row">
          <span />
          <span>ou continuer avec</span>
          <span />
        </div>

        <button type="button" className="btn-outline" onClick={handleGoogleSignIn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continuer avec Google
        </button>

        <p className="switch-text">
          Pas encore de compte ? <Link to="/signup" className="form-link">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}





