import { Link } from "react-router-dom";

const DEFAULT_AVATAR =
  "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/detail/${service.id}`} className="employee-card">
      <div className="employee-card-avatar">
        <img src={service.avatar || DEFAULT_AVATAR} alt={service.name} />
      </div>
      <div className="employee-card-content">
        <div className="employee-card-header">
          <h3>{service.name}</h3>
          <span>{service.category}</span>
        </div>
        <p className="service-specialization">{service.specialization}</p>
        <div className="employee-card-body">
          <p><strong>Localisation :</strong> {service.location}</p>
          <p><strong>Téléphone :</strong> +{service.phone}</p>
          <p><strong>Note :</strong> {service.rating.toFixed(1)} / 10</p>
        </div>
      </div>
    </Link>
  );
}
