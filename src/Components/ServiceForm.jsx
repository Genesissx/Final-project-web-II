import "./serviceform.css"
import React, { useState } from 'react'
import { User, Briefcase, Phone, MapPin, FileText, ChevronDown, ArrowLeft, Camera, Send } from 'lucide-react'

export default function ServiceForm({ onAdd }) {
  const [preview, setPreview] = useState(null)

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = {
      nom: formData.get('nom'),
      statut: formData.get('statut'),
      numero: formData.get('numero'),
      adresse: formData.get('adresse'),
      description: formData.get('description'),
    }
    onAdd(user)
    e.target.reset()
    setPreview(null)
  }

  return (
    <div className="service">
        <div className="service-text">
          <p className="service1">Service Connect</p>
          <h1 className="service-title">Ajouter un Service</h1>
        </div>

      <div className="form-sections">
        <form onSubmit={handleSubmit}>

        
          <div className="photo-zone">
            <label htmlFor="photo" className="photo-circle">
              {preview
                ? <img src={preview} alt="preview" className="photo-img" />
                : <>
                    <Camera size={26} color="#1a7a4a" />
                    <span>Photo<br/>Optionnelle</span>
                  </>
              }
            </label>
            <input id="photo" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
          </div>

         
          <div className="field">
            <div className="field-label">
              <User size={14} color="#1a7a4a" />
              Nom complet
            </div>
            <input type="text" name="nom" placeholder="Ex : Jean-Pierre Dupont" required />
          </div>

          
        <div className="field">
  <div className="field-label">
    <Briefcase size={14} color="#1a7a4a" />
    Catégorie
  </div>
  <input
    type="text"
    name="statut"
    placeholder="Ex : Plombier, Médecin..."
    list="metiers"
    required
  />
  <datalist id="metiers">
    <option value="Médecin" />
    <option value="Mécanicien" />
    <option value="Garagiste" />
    <option value="Chauffeur" />
    <option value="Plombier" />
    <option value="Électricien" />
    <option value="Informaticien" />
  </datalist>
</div>
           <div className="divider">
  <div className="divider-line"></div>
  <span className="divider-text">Coordonnées</span>
  <div className="divider-line"></div>
</div>
          
          <div className="field">
            <div className="field-label">
              <Phone size={14} color="#1a7a4a" />
              Numéro de téléphone
            </div>
            <input type="tel" name="numero" placeholder="+509 XXXX XXXX" required />
          </div>

        
          <div className="field">
            <div className="field-label">
              <MapPin size={14} color="#1a7a4a" />
              Adresse
            </div>
            <input type="text" name="adresse" placeholder="Ex : Pétion-Ville, Port-au-Prince" required />
          </div>

               <div className="divider">
  <div className="divider-line"></div>
  <span className="divider-text">À propos du service</span>
  <div className="divider-line"></div>
</div>
          <div className="field">
            <div className="field-label">
              <FileText size={14} color="#1a7a4a" />
              Description du service
            </div>
            <textarea name="description" placeholder="Décrivez votre service en quelques mots..." required />
          </div>

         
         <div className="field">
            <button type="submit" className="submit-btn">
            <Send size={18} />
            Publier le service
          </button>
         </div>

        </form>
      </div>
    </div>
  )
}