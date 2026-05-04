import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./terms.css";

export default function Terms() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const anchor = document.querySelector(location.hash);
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  return (
    <div className="terms-page">
      <div className="terms-card">
        <div className="terms-header">
          <h1>Conditions & Politique</h1>
          <p>Tout ce que vous devez savoir avant d'utiliser Service Connect.</p>
          <div className="terms-links">
            <Link to="/terms#conditions">Conditions générales</Link>
            <Link to="/terms#privacy">Politique de confidentialité</Link>
          </div>
        </div>

        <section id="conditions" className="terms-section">
          <h2>Conditions générales d'utilisation</h2>
          <p>
            En utilisant Service Connect, vous acceptez de fournir des informations exactes lors de l'inscription. Vous
            vous engagez à utiliser la plateforme de manière respectueuse et à ne pas publier de contenu frauduleux ou
            inapproprié.
          </p>
          <p>
            Les prestataires s'engagent à fournir des services conformes à la description de leur profil. Les clients
            doivent communiquer clairement leurs besoins et respecter les conditions de paiement convenues.
          </p>
          <p>
            Service Connect n'est pas responsable des conflits entre utilisateurs, mais nous fournissons des outils de
            contact et une expérience fiable pour trouver un prestataire qualifié.
          </p>
        </section>

        <section id="privacy" className="terms-section">
          <h2>Politique de confidentialité</h2>
          <p>
            Nous collectons uniquement les informations nécessaires pour créer et sécuriser votre compte : nom, email,
            numéro de téléphone et NIF/CIN. Ces données sont utilisées pour vous connecter, vous contacter et améliorer
            votre expérience sur la plateforme.
          </p>
          <p>
            Vos informations ne sont jamais vendues à des tiers. Nous utilisons des mesures de sécurité standard pour
            protéger vos données et nous vous encourageons à choisir un mot de passe fort.
          </p>
          <p>
            Vous pouvez à tout moment demander la correction ou la suppression de vos données personnelles en nous
            contactant depuis la page Contact.
          </p>
        </section>
      </div>
    </div>
  );
}
