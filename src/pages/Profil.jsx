import { useState } from 'react'
import { Settings, ChevronRight, Globe, Moon, HelpCircle, Info, LogOut, ShieldCheck } from 'lucide-react'
import './Profil.css'

export default function Profil() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="profil-page">

   

     
      <div className="profil-card">
        
        <div className="profil-user-info">
          <img
            src="https://i.pravatar.cc/80?img=3"
            alt="avatar"
            className="profil-avatar"
          />
          <div className="profil-user-text">
            <h2 className="profil-name">Axel Blaze</h2>
            <p className="profil-email">axelblaze@gmail.com</p>
            <div className="profil-badge">
              <ShieldCheck size={12} color="#1a7a4a" />
              <span>Membre vérifié</span>
            </div>
          </div>
        </div>

        
        <div className="profil-stats">
          <div className="profil-stat-item">
            <span className="profil-stat-num">12</span>
            <span className="profil-stat-label">Services ajoutés</span>
          </div>
          <div className="profil-stat-divider" />
          <div className="profil-stat-item">
            <span className="profil-stat-num">4.8 ⭐</span>
            <span className="profil-stat-label">Note moyenne</span>
          </div>
        </div>
      </div>

     
      <div className="profil-section-title">Paramètres</div>

      <div className="profil-menu">

        <button className="profil-menu-item">
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Settings size={18} color="#1a7a4a" />
            </div>
            <span>Modifier mon profil</span>
          </div>
          <ChevronRight size={18} color="#aaa" />
        </button>

        <div className="profil-menu-separator" />

        <button className="profil-menu-item">
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Globe size={18} color="#1a7a4a" />
            </div>
            <span>Langue</span>
          </div>
          <div className="profil-menu-right">
            <span className="profil-menu-value">Français</span>
            <ChevronRight size={18} color="#aaa" />
          </div>
        </button>

        <div className="profil-menu-separator" />

        <div className="profil-menu-item">
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Moon size={18} color="#1a7a4a" />
            </div>
            <span>Mode sombre</span>
          </div>
          <div
            className={`profil-toggle ${darkMode ? 'profil-toggle-on' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="profil-toggle-thumb" />
          </div>
        </div>

        <div className="profil-menu-separator" />

        <button className="profil-menu-item">
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <HelpCircle size={18} color="#1a7a4a" />
            </div>
            <span>Aide & Support</span>
          </div>
          <ChevronRight size={18} color="#aaa" />
        </button>

        <div className="profil-menu-separator" />

        <button className="profil-menu-item">
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Info size={18} color="#1a7a4a" />
            </div>
            <span>À propos</span>
          </div>
          <ChevronRight size={18} color="#aaa" />
        </button>

      </div>

    
      <button className="profil-logout-btn">
        <LogOut size={18} color="#e53e3e" />
        Se déconnecter
      </button>

    </div>
  )
}