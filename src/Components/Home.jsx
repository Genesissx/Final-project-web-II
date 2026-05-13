import ServiceCard from "./ServiceCard";
import services from "../data/services";
import { useState } from "react";

import "./Home.css";

const Home = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className="home-page">
      <header className="home-header">
        <p className="home-description">
          Trouvez rapidement un prestataire fiable près de chez vous.
        </p>
        <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un service, spécialisation ou lieu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      </header>

      <section className="services-preview">
        <h2>Services recommandés</h2>
        <div className="services-container">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
