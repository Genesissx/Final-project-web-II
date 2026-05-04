import { useNavigate, useParams } from "react-router-dom";
import { getAllServices } from "../data/services";
import "./detail.css";

const DEFAULT_AVATAR =
  "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const serviceHasSunday = (schedule) => {
  const normalized = schedule.toLowerCase();
  return normalized.includes("dim") || normalized.includes("dimanche") || normalized.includes("sun");
};

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const service = getAllServices().find((item) => item.id === id);

  if (!service) {
    return (
      <div className="detail-page">
        <div className="detail-card">
          <div className="detail-empty">Prestataire introuvable.</div>
        </div>
      </div>
    );
  }

  const isSunday = new Date().getDay() === 0;
  const isAvailableToday = !isSunday || serviceHasSunday(service.schedule);
  const status = isAvailableToday ? service.status : "Indisponible";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    service.location
  )}`;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-header">
          <button type="button" className="back-button" onClick={() => navigate(-1)}>
            Retour
          </button>
          <div className="page-title">Détails du service</div>
        </div>

        <div className="service-profile">
          <div className="avatar-wrapper">
            <img src={service.avatar || DEFAULT_AVATAR} alt={service.name} className="avatar-img" />
            <span className={`status-pill ${status === "Disponible" ? "available" : "busy"}`}>
              {status}
            </span>
          </div>
          <div className="profile-info">
            <h2>{service.name}</h2>
            <p className="profile-role">{service.category}</p>
            <p className="profile-specialization">{service.specialization}</p>
            <p className="profile-location">{service.location}</p>
            <div className="rating-row">
              <span>⭐️</span>
              <span>{service.rating.toFixed(1)} / 10</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <a className="action-button" href={`tel:+${service.phone}`}>
            Appeler
          </a>
          <a className="action-button secondary" href={`https://wa.me/${service.phone}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>

        <section className="info-section">
          <h3>Informations</h3>
          <div className="info-row">
            <span>Catégorie</span>
            <strong>{service.category}</strong>
          </div>
          <div className="info-row">
            <span>Localisation</span>
            <strong>{service.location}</strong>
          </div>
          <div className="info-row">
            <span>Téléphone</span>
            <strong>+{service.phone}</strong>
          </div>
          <div className="info-row">
            <span>Disponibilité</span>
            <strong>{service.schedule}</strong>
          </div>
        </section>

        <section className="description-section">
          <h3>Description</h3>
          <p>{service.description}</p>
        </section>

        <section className="map-action">
          <a className="map-button" href={googleMapsUrl} target="_blank" rel="noreferrer">
            Ouvrir dans Google Maps
          </a>
        </section>
      </div>
    </div>
  );
}
