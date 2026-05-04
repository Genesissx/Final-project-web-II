import "./serviceform.css";
import { useEffect, useState } from "react";
import { User, Briefcase, Phone, MapPin, FileText, Camera, Send } from "lucide-react";

const DEFAULT_AVATAR =
  "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const validateHaitianPhone = (value) => {
  const normalized = value.replace(/\D/g, "");
  return /^(?:509)?(3[0-9]|4[0-9]|5[0-9])[0-9]{6}$/.test(normalized);
};

export default function ServiceForm({ onAdd }) {
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timeout);
  }, [message]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newErrors = {};

    const values = {
      name: formData.get("nom")?.trim(),
      category: formData.get("statut")?.trim(),
      specialization: formData.get("specialization")?.trim(),
      phone: formData.get("numero")?.trim(),
      location: formData.get("adresse")?.trim(),
      availability: formData.get("availability"),
      description: formData.get("description")?.trim(),
    };

    if (!values.name) newErrors.nom = "Nom requis";
    if (!values.category) newErrors.statut = "Catégorie requise";
    if (!values.specialization) newErrors.specialization = "Spécialisation requise";
    if (!values.phone) newErrors.numero = "Numéro requis";
    else if (!validateHaitianPhone(values.phone)) newErrors.numero = "Numéro haïtien invalide";
    if (!values.location) newErrors.adresse = "Adresse requise";
    if (!values.availability) newErrors.availability = "Sélectionnez la disponibilité";
    if (!values.description) newErrors.description = "Description requise";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessage("");
      return;
    }

    const service = {
      id: `${Date.now()}`,
      name: values.name,
      category: values.category,
      specialization: values.specialization,
      location: values.location,
      phone: values.phone.replace(/\D/g, ""),
      schedule: values.availability,
      status: "Disponible",
      description: values.description,
      avatar: preview || DEFAULT_AVATAR,
      rating: 8.0,
    };

    onAdd(service);
    setMessage("Service publié avec succès !");
    setErrors({});
    e.target.reset();
    setPreview(null);
  };

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
              {preview ? (
                <img src={preview} alt="preview" className="photo-img" />
              ) : (
                <>
                  <Camera size={26} color="#1a7a4a" />
                  <span>Photo<br />Optionnelle</span>
                </>
              )}
            </label>
            <input id="photo" type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
          </div>

          <div className="field">
            <div className="field-label">
              <User size={14} color="#1a7a4a" />
              Nom complet
            </div>
            <input type="text" name="nom" placeholder="Ex : Jean-Pierre Dupont" required />
            {errors.nom && <span className="field-error">{errors.nom}</span>}
          </div>

          <div className="field">
            <div className="field-label">
              <Briefcase size={14} color="#1a7a4a" />
              Catégorie
            </div>
            <select name="statut" required>
              <option value="">Sélectionner</option>
              <option value="Plombier">Plombier</option>
              <option value="Électricien">Électricien</option>
              <option value="Mécanicien">Mécanicien</option>
              <option value="Technicien">Technicien</option>
              <option value="Photographe">Photographe</option>
              <option value="Jardinier">Jardinier</option>
              <option value="Peintre">Peintre</option>
              <option value="Informaticien">Informaticien</option>
              <option value="Coiffeur">Coiffeur</option>
              <option value="Ménage">Ménage</option>
              <option value="Livraison">Livraison</option>
              <option value="Réparation">Réparation</option>
              <option value="Serrurier">Serrurier</option>
              <option value="Cuisine">Cuisine</option>
              <option value="Garde d'enfant">Garde d'enfant</option>
              <option value="Community manager">Community manager</option>
            </select>
            {errors.statut && <span className="field-error">{errors.statut}</span>}
          </div>

          <div className="field">
            <div className="field-label">
              <Briefcase size={14} color="#1a7a4a" />
              Spécialisation
            </div>
            <input type="text" name="specialization" placeholder="Ex : Débouchage urgent" required />
            {errors.specialization && <span className="field-error">{errors.specialization}</span>}
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
            <input type="tel" name="numero" placeholder="+509 37000000" required />
            {errors.numero && <span className="field-error">{errors.numero}</span>}
          </div>

          <div className="field">
            <div className="field-label">
              <MapPin size={14} color="#1a7a4a" />
              Adresse
            </div>
            <input type="text" name="adresse" placeholder="Ex : Pétion-Ville, Port-au-Prince" required />
            {errors.adresse && <span className="field-error">{errors.adresse}</span>}
          </div>

          <div className="field">
            <div className="field-label">Disponibilité</div>
            <input
              type="text"
              name="availability"
              placeholder="Ex : Lun - Ven : 8h00 - 17h00"
              required
            />
            {errors.availability && <span className="field-error">{errors.availability}</span>}
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
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {message && <div className="success-message">{message}</div>}

          <div className="field">
            <button type="submit" className="submit-btn">
              <Send size={18} />
              Publier le service
            </button>
          </div>
        </form>
      </div>

      {message && <div className="success-message toast-alert">{message}</div>}
    </div>
  );
}
