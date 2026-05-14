import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Help.css'

export default function Help() {
  const navigate = useNavigate()

  return (
    <div className="help-page">
      <div className="help-header">
        <button 
          className="help-back-btn"
          onClick={() => navigate('/Profil')}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="help-title">Aide & Support</h1>
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2 className="help-section-title">Questions fréquemment posées</h2>
          
          <div className="help-item">
            <h3 className="help-item-title">Comment créer un service ?</h3>
            <p className="help-item-text">
              Accédez à la page "Ajouter un service" via le menu principal. Remplissez les informations de votre service, ajoutez une description détaillée et des images, puis cliquez sur "Publier".
            </p>
          </div>

          <div className="help-item">
            <h3 className="help-item-title">Comment modifier mon profil ?</h3>
            <p className="help-item-text">
              Allez dans les paramètres du profil et cliquez sur "Modifier mon profil". Vous pouvez mettre à jour vos informations personnelles, votre téléphone et d'autres détails.
            </p>
          </div>

          <div className="help-item">
            <h3 className="help-item-title">Comment rechercher des services ?</h3>
            <p className="help-item-text">
              Utilisez la barre de recherche sur la page d'accueil pour trouver des services spécifiques. Vous pouvez filtrer par catégorie, localisation ou prix.
            </p>
          </div>

          <div className="help-item">
            <h3 className="help-item-title">Comment contacter un prestataire ?</h3>
            <p className="help-item-text">
              Consultez la page de détail du service, puis utilisez le formulaire de contact pour envoyer un message au prestataire.
            </p>
          </div>

          <div className="help-item">
            <h3 className="help-item-title">Comment activer le mode sombre ?</h3>
            <p className="help-item-text">
              Allez dans les paramètres du profil, puis activez le switch "Mode sombre". Vos préférences sont automatiquement sauvegardées.
            </p>
          </div>
        </div>

        <div className="help-section">
          <h2 className="help-section-title">Besoin d'aide supplémentaire ?</h2>
          <p className="help-description">
            Si vous ne trouvez pas la réponse à votre question, veuillez nous contacter via le formulaire de contact ou envoyez-nous un email.
          </p>
          <button 
            className="help-contact-btn"
            onClick={() => navigate('/Contact')}
          >
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  )
}
