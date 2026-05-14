import { Link } from "react-router-dom";
import "./Footer.css";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    href: "https://x.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/50900000000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.526 5.845L0 24l6.335-1.503A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.549 9.549 0 01-4.891-1.344l-.35-.208-3.624.86.92-3.51-.228-.362A9.6 9.6 0 012.4 12c0-5.294 4.306-9.6 9.6-9.6s9.6 4.306 9.6 9.6-4.306 9.6-9.6 9.6z" />
      </svg>
    ),
  },
];

const FOOTER_LINKS = [
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Ajouter un service", to: "/add-service" },
  { label: "Politique de confidentialité", to: "/privacy" },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── Colonne gauche : brand ── */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <span className="footer__logo-name">
              Service Connect <span className="footer__logo-country">Haïti</span>
            </span>
          </div>
          <p className="footer__tagline">
            La plateforme de référence pour connecter les prestataires de services et les clients partout en Haïti.
          </p>
        </div>

        {/* ── Colonne centrale : liens rapides ── */}
        <div className="footer__links">
          <h4 className="footer__col-title">Liens rapides</h4>
          <ul className="footer__links-list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Colonne droite : réseaux sociaux ── */}
        <div className="footer__social">
          <h4 className="footer__col-title">Suivez-nous</h4>
          <div className="footer__social-icons">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="footer__social-note">
            Restez connectés pour les dernières mises à jour et offres de services.
          </p>
        </div>

      </div>

      {/* ── Barre copyright ── */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copy">
            © {YEAR} <strong>Service Connect Haïti</strong>. Tous droits réservés.
          </p>
          <p className="footer__made">
            Fait avec <span className="footer__heart">♥</span> pour Haïti
          </p>
        </div>
      </div>
    </footer>
  );
}
