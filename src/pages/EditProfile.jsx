import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Save } from 'lucide-react'
import { auth, db } from '../lib/firebaseClient'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import './EditProfile.css'

export default function EditProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    nifcin: '',
  })

  // Charger les données utilisateur
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        await loadUserProfile(currentUser.uid)
      } else {
        navigate('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  // Charger le profil depuis Firebase
  const loadUserProfile = async (uid) => {
    try {
      const profilesRef = collection(db, 'profiles')
      const q = query(profilesRef, where('uid', '==', uid))
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const profileData = snapshot.docs[0].data()
        setFormData({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          phone: profileData.phone || '',
          nifcin: profileData.nifcin || '',
        })
      }
    } catch (err) {
      console.error('Erreur lors du chargement du profil:', err)
      setError('Erreur lors du chargement du profil')
    }
  }

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Sauvegarder les modifications
  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const profilesRef = collection(db, 'profiles')
      const q = query(profilesRef, where('uid', '==', user.uid))
      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const profileDoc = snapshot.docs[0]
        await updateDoc(doc(db, 'profiles', profileDoc.id), formData)
        setSuccess(true)
        
        setTimeout(() => {
          navigate('/Profil')
        }, 1500)
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err)
      setError('Erreur lors de la sauvegarde du profil')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="edit-profile-page">Chargement...</div>
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-header">
        <button 
          className="edit-profile-back-btn"
          onClick={() => navigate('/Profil')}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="edit-profile-title">Modifier mon profil</h1>
      </div>

      {error && <div className="edit-profile-error">{error}</div>}
      {success && <div className="edit-profile-success">Profil mis à jour avec succès !</div>}

      <form onSubmit={handleSave} className="edit-profile-form">
        <div className="edit-profile-section">
          <label htmlFor="firstName" className="edit-profile-label">Prénom</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="edit-profile-input"
            placeholder="Votre prénom"
          />
        </div>

        <div className="edit-profile-section">
          <label htmlFor="lastName" className="edit-profile-label">Nom</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="edit-profile-input"
            placeholder="Votre nom"
          />
        </div>

        <div className="edit-profile-section">
          <label htmlFor="phone" className="edit-profile-label">Téléphone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="edit-profile-input"
            placeholder="Votre numéro de téléphone"
          />
        </div>

        <div className="edit-profile-section">
          <label htmlFor="nifcin" className="edit-profile-label">NIF/CIN</label>
          <input
            id="nifcin"
            type="text"
            name="nifcin"
            value={formData.nifcin}
            onChange={handleChange}
            className="edit-profile-input"
            placeholder="Votre NIF/CIN"
          />
        </div>

        <button 
          type="submit" 
          className="edit-profile-save-btn"
          disabled={saving}
        >
          <Save size={18} />
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </form>
    </div>
  )
}
