import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('Français')

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'Français'
    setLanguage(savedLanguage)
  }, [])

  // Sauvegarder la langue dans localStorage quand elle change
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'Français' ? 'English' : 'Français')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage doit être utilisé avec LanguageProvider')
  }
  return context
}

// Traductions
export const translations = {
  Français: {
    // Pages générales
    search: 'Rechercher',
    results: 'Résultats',
    categories: 'Catégories',
    loading: 'Chargement...',
    error: 'Erreur',
    noResults: 'Aucun résultat trouvé',
    
    // Profil
    profile: 'Profil',
    settings: 'Paramètres',
    language: 'Langue',
    darkMode: 'Mode sombre',
    help: 'Aide & Support',
    about: 'À propos',
    logout: 'Se déconnecter',
    editProfile: 'Modifier mon profil',
    servicesAdded: 'Services ajoutés',
    averageRating: 'Note moyenne',
    verifiedMember: 'Membre vérifié',
    
    // Formulaires
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    nifcin: 'NIF/CIN',
    save: 'Enregistrer',
    cancel: 'Annuler',
    
    // Messages
    profileUpdated: 'Profil mis à jour avec succès !',
    errorSaving: 'Erreur lors de la sauvegarde',
  },
  English: {
    // General pages
    search: 'Search',
    results: 'Results',
    categories: 'Categories',
    loading: 'Loading...',
    error: 'Error',
    noResults: 'No results found',
    
    // Profile
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    darkMode: 'Dark Mode',
    help: 'Help & Support',
    about: 'About',
    logout: 'Sign Out',
    editProfile: 'Edit Profile',
    servicesAdded: 'Services Added',
    averageRating: 'Average Rating',
    verifiedMember: 'Verified Member',
    
    // Forms
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    nifcin: 'ID/CIN',
    save: 'Save',
    cancel: 'Cancel',
    
    // Messages
    profileUpdated: 'Profile updated successfully!',
    errorSaving: 'Error saving profile',
  },
}

export function getTranslation(language, key) {
  return translations[language]?.[key] || translations['Français']?.[key] || key
}
