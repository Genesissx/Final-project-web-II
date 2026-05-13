import ServiceCard from "./ServiceCard";
import services from "../data/services";
import "./Home.css";

const Home = () => {
  // Grouper les services par catégorie
  const categories = services.reduce((acc, service) => {
    const cat = service.category || "Autres";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  return (
    <div className="home-page">
      <div className="home-container">
        {Object.entries(categories).map(([categoryName, categoryServices]) => (
          <section key={categoryName} className="services-section">
            <h2 className="section-title">{categoryName}</h2>
            <div className="services-grid">
              {categoryServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
