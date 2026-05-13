import { Link } from "react-router-dom";

const DEFAULT_AVATAR =
  "https://plus.unsplash.com/premium_photo-1739786996022-5ed5b56834e2?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ServiceCard({ service }) {
  return (
    <Link to={`/detail/${service.id}`} className="service-card-v2">
      <div className="service-card-image">
        <img src={service.avatar || DEFAULT_AVATAR} alt={service.name} />
      </div>
      <div className="service-card-info">
        <h3 className="service-card-name">{service.name}</h3>
        <p className="service-card-price">{service.specialization}</p>
      </div>
    </Link>
  );
}
