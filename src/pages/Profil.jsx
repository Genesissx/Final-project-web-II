import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, ChevronRight, Globe, Moon, HelpCircle, Info, LogOut, ShieldCheck } from 'lucide-react'
import { auth, db, signOutUser } from '../lib/firebaseClient'
import { useLanguage } from '../context/LanguageContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import './Profil.css'

export default function Profil() {
  const navigate = useNavigate()
  const { language, toggleLanguage } = useLanguage()
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ servicesCount: 0, avgRating: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    applyDarkMode(savedDarkMode)
  }, [])

  // Charger les données utilisateur
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        await loadUserProfile(currentUser.uid)
        await loadUserStats(currentUser.uid)
      } else {
        navigate('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  // Charger le profil utilisateur depuis Firebase
  const loadUserProfile = async (uid) => {
    try {
      const profilesRef = collection(db, 'profiles')
      const q = query(profilesRef, where('uid', '==', uid))
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const profileData = snapshot.docs[0].data()
        setUser(prev => ({
          ...prev,
          displayName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || 'Utilisateur',
          photoURL: profileData.profileImage || `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}`
        }))
      }
    } catch (err) {
      console.error('Erreur lors du chargement du profil:', err)
      setError('Erreur lors du chargement du profil')
    }
  }

  // Charger les statistiques utilisateur
  const loadUserStats = async (uid) => {
    try {
      const servicesRef = collection(db, 'services')
      const q = query(servicesRef, where('userId', '==', uid))
      const snapshot = await getDocs(q)
      
      setStats(prev => ({
        ...prev,
        servicesCount: snapshot.size
      }))
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err)
    }
  }

  // Appliquer le mode sombre
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.style.setProperty('--bg-primary', '#1a1a1a')
      document.documentElement.style.setProperty('--text-primary', '#ffffff')
      document.body.classList.add('dark-mode')
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f5f0e8')
      document.documentElement.style.setProperty('--text-primary', '#0f1c14')
      document.body.classList.remove('dark-mode')
    }
  }

  // Gérer le changement de mode sombre
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
    applyDarkMode(newDarkMode)
  }

  // Gérer le changement de langue
  const handleLanguageChange = () => {
    toggleLanguage()
  }

  // Gérer la déconnexion
  const handleLogout = async () => {
    try {
      await signOutUser()
      localStorage.removeItem('darkMode')
      navigate('/login')
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err)
      setError('Erreur lors de la déconnexion')
    }
  }

  if (loading) {
    return <div className="profil-page">Chargement...</div>
  }

  const displayName = user?.displayName || user?.email || 'Utilisateur'
  const avatar = user?.photoURL || `https://i.pravatar.cc/80?img=3`

  return (
    <div className="profil-page">
      {error && <div className="profil-error-message">{error}</div>}

      <div className="profil-card">
        <div className="profil-user-info">
          <img
            src={avatar}
            alt="avatar"
            className="profil-avatar"
          />
          <div className="profil-user-text">
            <h2 className="profil-name">{displayName}</h2>
            <p className="profil-email">{user?.email}</p>
            <div className="profil-badge">
              <ShieldCheck size={12} color="#1a7a4a" />
              <span>Membre vérifié</span>
            </div>
          </div>
        </div>

        <div className="profil-stats">
          <div className="profil-stat-item">
            <span className="profil-stat-num">{stats.servicesCount}</span>
            <span className="profil-stat-label">Services ajoutés</span>
          </div>
          <div className="profil-stat-divider" />
          <div className="profil-stat-item">
            <span className="profil-stat-num">{stats.avgRating} ⭐</span>
            <span className="profil-stat-label">Note moyenne</span>
          </div>
        </div>
      </div>

      <div className="profil-section-title">Paramètres</div>

      <div className="profil-menu">
        <button 
          className="profil-menu-item"
          onClick={() => navigate('/edit-profile')}
        >
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Settings size={18} color="#1a7a4a" />
            </div>
            <span>Modifier mon profil</span>
          </div>
          <ChevronRight size={18} color="#aaa" />
        </button>

        <div className="profil-menu-separator" />

        <button 
          className="profil-menu-item"
          onClick={handleLanguageChange}
        >
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Globe size={18} color="#1a7a4a" />
            </div>
            <span>Langue</span>
          </div>
          <div className="profil-menu-right">
            <span className="profil-menu-value">{language}</span>
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
            onClick={handleDarkModeToggle}
          >
            <div className="profil-toggle-thumb" />
          </div>
        </div>

        <div className="profil-menu-separator" />

        <button 
          className="profil-menu-item"
          onClick={() => navigate('/help')}
        >
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <HelpCircle size={18} color="#1a7a4a" />
            </div>
            <span>Aide & Support</span>
          </div>
          <ChevronRight size={18} color="#aaa" />
        </button>

        <div className="profil-menu-separator" />

        <button 
          className="profil-menu-item"
          onClick={() => navigate('/About')}
        >
          <div className="profil-menu-left">
            <div className="profil-menu-icon">
              <Info size={18} color="#1a7a4a" />
            </div>
            <span>À propos</span>
          </div>
          <ChevronRight size={18} color="#aaa" />
        </button>
      </div>

      <button 
        className="profil-logout-btn"
        onClick={handleLogout}
      >
        <LogOut size={18} color="#e53e3e" />
        Se déconnecter
      </button>
    </div>
  )
}