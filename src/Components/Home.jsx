import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ClipboardList, MessageCircle, Sparkles } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { getAllServices } from "../data/services";
import { initializeServices } from "../lib/initServices";
import { getServiceCategory } from "../lib/searchHelpers";
import { HOME_CATEGORY_SECTIONS } from "../data/serviceSeeds";
import "./Home.css";

const STEPS = [
  {
    icon: Search,
    title: "Recherchez",
    text: "Utilisez la page Recherche pour filtrer par catégorie, région ou mot-clé et affiner votre liste.",
  },
  {
    icon: ClipboardList,
    title: "Comparez",
    text: "Chaque carte affiche la note, la localisation et la spécialité pour vous aider à choisir en confiance.",
  },
  {
    icon: MessageCircle,
    title: "Contactez",
    text: "Ouvrez une fiche détaillée pour voir toutes les informations et joindre le prestataire.",
  },
];

function slugId(cat) {
  return cat
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const byCategory = useMemo(() => {
    const map = new Map();
    for (const s of services) {
      const c = getServiceCategory(s)?.trim();
      if (!c) continue;
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(s);
    }
    for (const arr of map.values()) {
      arr.sort(
        (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0),
      );
    }
    return map;
  }, [services]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      try {
        await initializeServices();
        const fetched = await getAllServices();
        if (!cancelled) {
          setServices(Array.isArray(fetched) ? fetched : []);
        }
      } catch (error) {
        console.error("Erreur chargement services:", error);
        if (!cancelled) setServices([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const t = setTimeout(() => {
      void run();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <p className="home-badge">
            <Sparkles size={16} aria-hidden />
            Plateforme de mise en relation
          </p>
          <h1 id="home-title">
            Service <span className="highlight">Connect</span>
          </h1>
          <p className="home-lead">
            Trouvez un prestataire fiable près de chez vous — pour l’entretien, les réparations, le jardinage et bien plus.
          </p>
          <p className="home-description">
            Parcourez les profils, comparez les notes et accédez aux coordonnées en quelques clics. Que vous cherchiez de l’aide ou que vous souhaitiez proposer vos services, tout est regroupé ici pour gagner du temps.
          </p>
          <div className="home-hero-actions">
            <Link to="/search" className="home-cta home-cta--primary">
              <Search size={18} aria-hidden />
              Lancer une recherche
            </Link>
            <Link to="/Ajouter" className="home-cta home-cta--secondary">
              Proposer mes services
            </Link>
            <Link to="/Contact" className="home-cta home-cta--ghost">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="home-how" aria-labelledby="how-title">
        <div className="home-section-head">
          <h2 id="how-title">Comment ça marche ?</h2>
          <p className="home-section-sub">
            Trois étapes simples pour trouver la bonne personne ou faire connaître votre activité.
          </p>
        </div>
        <ol className="home-steps">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="home-step">
              <span className="home-step-num" aria-hidden>
                {index + 1}
              </span>
              <div className="home-step-icon" aria-hidden>
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="home-step-title">{title}</h3>
              <p className="home-step-text">{text}</p>
            </li>
          ))}
        </ol>
        <p className="home-how-footnote">
          Astuce : utilisez la barre de navigation en bas de l’écran pour passer rapidement entre l’accueil, la recherche, l’ajout d’un service et votre profil.
        </p>
      </section>

      <section className="services-preview" aria-labelledby="services-title">
        <div className="home-section-head">
          <h2 id="services-title">Services recommandés par catégorie</h2>
          <p className="home-section-sub">
            Pour chaque métier ci-dessous, un aperçu de six prestataires (les mieux notés en premier). Les profils complets sont stockés en base ; explorez aussi la recherche pour toutes les catégories.
          </p>
        </div>

        {loading ? (
          <div className="home-categories-wrap">
            {HOME_CATEGORY_SECTIONS.map((cat) => (
              <div
                key={cat}
                className="home-category-section home-category-section--loading"
              >
                <div className="home-category-head">
                  <div className="home-skeleton-bar home-skeleton-bar--title" aria-hidden />
                </div>
                <div className="home-category-grid">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`${cat}-sk-${i}`}
                      className="service-card-skeleton"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            ))}
            <p className="home-loading-msg home-loading-msg--full" role="status" aria-live="polite">
              Chargement des services…
            </p>
          </div>
        ) : services.length > 0 ? (
          <div className="home-categories-wrap">
            {HOME_CATEGORY_SECTIONS.map((cat) => {
              const list = byCategory.get(cat) ?? [];
              const cards = list.slice(0, 6);
              const sid = slugId(cat);

              return (
                <section
                  key={cat}
                  className="home-category-section"
                  aria-labelledby={`home-cat-${sid}`}
                >
                  <div className="home-category-head">
                    <h3 id={`home-cat-${sid}`}>{cat}</h3>
                    <Link
                      to="/search"
                      state={{ category: cat }}
                      className="home-category-link"
                    >
                      Voir tout
                    </Link>
                  </div>
                  {cards.length === 0 ? (
                    <p className="home-category-empty">
                      Aucun prestataire dans cette catégorie pour le moment.
                    </p>
                  ) : (
                    <div className="home-category-grid">
                      {cards.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="home-empty">
            <p>Aucun service n’est encore disponible pour le moment.</p>
            <p className="home-empty-hint">
              Vous pouvez être le premier à en ajouter un pour aider les autres utilisateurs.
            </p>
            <Link to="/Ajouter" className="home-cta home-cta--primary">
              Ajouter un service
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
