import ServiceCard from "./ServiceCard";
import services from "../data/services";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>
          Service <span className="highlight">Connect</span>
        </h1>
        <p className="home-description">
          Trouvez rapidement un prestataire fiable près de chez vous.
        </p>
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
