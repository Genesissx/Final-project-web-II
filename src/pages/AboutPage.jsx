import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './About.css'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="about-page">
      <div className="about-header">
        <button 
          className="about-back-btn"
          onClick={() => navigate('/Profil')}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="about-title">À propos</h1>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2 className="about-section-title">À propos de notre plateforme</h2>
          <p className="about-text">
            Notre plateforme est dédiée à la connexion entre les prestataires de services et les clients à la recherche de solutions de qualité.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Notre mission</h2>
          <p className="about-text">
            Faciliter l'accès à des services fiables et professionnels en créant une communauté de confiance où les prestataires peuvent mettre en avant leur expertise et les clients peuvent trouver exactement ce dont ils ont besoin.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Nos valeurs</h2>
          <ul className="about-list">
            <li><strong>Confiance :</strong> Nous garantissons la transparence et la sécurité dans toutes les transactions.</li>
            <li><strong>Qualité :</strong> Nous nous engageons à promouvoir des services de haute qualité.</li>
            <li><strong>Accessibilité :</strong> Nous rendons les services accessibles à tous.</li>
            <li><strong>Support :</strong> Nous sommes là pour soutenir nos utilisateurs à chaque étape.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Informations</h2>
          <p className="about-text">
            <strong>Version :</strong> 1.0.0
          </p>
          <p className="about-text">
            <strong>Dernière mise à jour :</strong> 2026
          </p>
          <p className="about-text">
            Pour toute question ou suggestion, n'hésitez pas à nous contacter.
          </p>
        </div>

        <button 
          className="about-contact-btn"
          onClick={() => navigate('/Contact')}
        >
          Nous contacter
        </button>
      </div>
    </div>
  )
}
