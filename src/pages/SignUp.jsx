import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

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

const passwordStrength = (password) => {
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (length >= 10 && hasLower && hasUpper && hasDigit && hasSymbol) {
    return { label: "Fort", value: 100, color: "#1a7a4a" };
  }
  if (length >= 8 && ((hasLower && hasUpper) || (hasLower && hasDigit) || (hasUpper && hasDigit))) {
    return { label: "Moyen", value: 66, color: "#c9933a" };
  }
  if (length > 0) {
    return { label: "Faible", value: 33, color: "#e07070" };
  }
  return { label: "", value: 0, color: "#2a3d2e" };
};

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nifcin: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    acceptedTerms: false,
  });
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

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validateEmail = (value) => {
    if (!value) return false;
    return /^\S+@\S+\.\S+$/.test(value);
  };

  const validateNifCin = (value) => {
    if (!value) return false;
    const trimmed = value.trim().replace(/\s+/g, "");
    if (/^[0-9]{9,11}$/.test(trimmed)) {
      return true;
    }
    if (/^[A-Z0-9]{8,9}$/.test(trimmed) && /[A-Z]/.test(trimmed) && /\d/.test(trimmed)) {
      return true;
    }
    return false;
  };

  const validateHaitianPhone = (value) => {
    const trimmed = value.replace(/\D/g, "");
    return /^(3[0-9]|4[0-9]|55)[0-9]{6}$/.test(trimmed);
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Prénom requis";
    if (!form.lastName.trim()) nextErrors.lastName = "Nom requis";
    if (!form.nifcin.trim()) nextErrors.nifcin = "NIF ou CIN requis";
    else if (!validateNifCin(form.nifcin.trim())) nextErrors.nifcin = "Format NIF/CIN invalide";
    if (!form.phone.trim()) nextErrors.phone = "Numéro requis";
    else if (!validateHaitianPhone(form.phone.trim())) nextErrors.phone = "Numéro haïtien invalide";
    if (!form.email.trim()) nextErrors.email = "Email requis";
    else if (!validateEmail(form.email.trim())) nextErrors.email = "Email invalide";
    return nextErrors;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!form.password || form.password.length < 6) nextErrors.password = "6 caractères minimum";
    if (form.password !== form.confirm) nextErrors.confirm = "Les mots de passe ne correspondent pas";
    if (!form.acceptedTerms) nextErrors.acceptedTerms = "Vous devez accepter les CGU";
    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validateStep1();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    const nextErrors = validateStep2();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    showToast("Compte créé avec succès !", "success");
    setTimeout(() => navigate("/home"), 900);
  };

  const handleGoogleSignUp = () => {
    showToast("Inscription Google réussie !", "success");
    setTimeout(() => navigate("/home"), 900);
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="auth-page">
      <div className="auth-card">
        {toast.message && <div className={`toast ${toast.type}`}>{toast.message}</div>}
        <div className="brand-card">
          <div className="brand-mark">SC</div>
          <div>
            <h1 className="brand-title">Service Connect</h1>
            <p className="brand-subtitle">Inscrivez-vous pour trouver des services fiables.</p>
          </div>
        </div>

        <div className="auth-header">
          <h2>Rejoignez-nous</h2>
          <p>Créez votre compte et connectez-vous aux meilleurs prestataires.</p>
        </div>

        <div className="step-row">
          <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="step-line" />
          <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2</div>
        </div>
        <div className="step-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: step === 1 ? "45%" : "100%" }} />
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="row-two">
              <FormField label="Prénom" error={errors.firstName}>
                <input
                  className={`auth-input ${errors.firstName ? "error" : ""}`}
                  placeholder="Jean"
                  value={form.firstName}
                  onChange={(event) => setField("firstName", event.target.value)}
                />
              </FormField>
              <FormField label="Nom" error={errors.lastName}>
                <input
                  className={`auth-input ${errors.lastName ? "error" : ""}`}
                  placeholder="Pierre"
                  value={form.lastName}
                  onChange={(event) => setField("lastName", event.target.value)}
                />
              </FormField>
            </div>

            <FormField label="NIF / CIN" error={errors.nifcin}>
              <input
                className={`auth-input ${errors.nifcin ? "error" : ""}`}
                placeholder="12345678A ou 123456789"
                value={form.nifcin}
                onChange={(event) => setField("nifcin", event.target.value.toUpperCase())}
              />
            </FormField>

            <FormField label="Téléphone" error={errors.phone}>
              <div className="phone-row">
                <div className="phone-prefix">🇭🇹 +509</div>
                <input
                  className={`auth-input ${errors.phone ? "error" : ""}`}
                  type="tel"
                  placeholder="37000000"
                  value={form.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                />
              </div>
            </FormField>

            <FormField label="Email" error={errors.email}>
              <input
                className={`auth-input ${errors.email ? "error" : ""}`}
                type="email"
                placeholder="jean@exemple.com"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
              />
            </FormField>

            <button className="btn-primary" type="button" onClick={goNext}>
              Continuer
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <FormField label="Mot de passe" error={errors.password}>
              <div className="password-row">
                <input
                  className={`auth-input ${errors.password ? "error" : ""}`}
                  type={showPw ? "text" : "password"}
                  placeholder="6 caractères minimum"
                  value={form.password}
                  onChange={(event) => setField("password", event.target.value)}
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

            <div className="password-strength">
              <div className="strength-label">Force du mot de passe :</div>
              <div className="strength-meter">
                <div className="strength-fill" style={{ width: `${strength.value}%`, background: strength.color }} />
              </div>
              <div className="strength-text" style={{ color: strength.color }}>
                {strength.label || "Entrez un mot de passe"}
              </div>
            </div>

            <FormField label="Confirmer le mot de passe" error={errors.confirm}>
              <input
                className={`auth-input ${errors.confirm ? "error" : ""}`}
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirm}
                onChange={(event) => setField("confirm", event.target.value)}
              />
            </FormField>

            <div className="checkbox-field">
              <label>
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={(event) => setField("acceptedTerms", event.target.checked)}
                />
                J'accepte les <Link to="/terms#conditions">Conditions générales d'utilisation</Link>.
              </label>
              {errors.acceptedTerms && <span className="field-error">{errors.acceptedTerms}</span>}
            </div>

            <p className="privacy-text">
              En créant un compte, vous acceptez nos <Link to="/terms#conditions">Conditions d'utilisation</Link> et notre <Link to="/terms#privacy">Politique de confidentialité</Link>.
            </p>

            <div className="button-row">
              <button className="btn-outline" type="button" onClick={() => setStep(1)}>
                Retour
              </button>
              <button className="btn-primary" type="button" onClick={handleSubmit}>
                Créer mon compte
              </button>
            </div>
          </>
        )}

        <div className="divider-row">
          <span />
          <span>ou inscrire avec</span>
          <span />
        </div>

        <button type="button" className="btn-outline" onClick={handleGoogleSignUp}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continuer avec Google
        </button>

        <p className="switch-text">
          Déjà inscrit ? <Link to="/login" className="form-link">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
