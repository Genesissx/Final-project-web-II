import { useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import { getAllServices } from "../data/services";
import "./Search.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const services = getAllServices();

  const filteredServices = services.filter((service) => {
    const lowerSearch = search.toLowerCase();
    return (
      service.name.toLowerCase().includes(lowerSearch) ||
      service.category.toLowerCase().includes(lowerSearch) ||
      service.specialization.toLowerCase().includes(lowerSearch) ||
      service.location.toLowerCase().includes(lowerSearch)
    ) && (selectedCategory === "" || service.category === selectedCategory);
  });

  const categories = [
    "Plombier",
    "Électricien",
    "Mécanicien",
    "Technicien",
    "Photographe",
    "Jardinier",
    "Peintre",
    "Informaticien",
    "Coiffeur",
    "Ménage",
    "Livraison",
    "Réparation",
    "Serrurier",
    "Cuisine",
    "Jardinage",
    "Garde d'enfant",
    "Community manager",
  ];

  return (
    <div className="search-page">
      <header className="search-header">
        <h1>Recherche de services</h1>
        <p>Utilisez la barre de recherche et les catégories pour trouver le prestataire idéal.</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un service, spécialisation ou lieu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="services-container">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="no-results">Aucun service trouvé</p>
        )}
      </div>
    </div>
  );
}
