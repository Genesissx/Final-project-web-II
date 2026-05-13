import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Filter, Home, Search as SearchIcon, Sparkles } from "lucide-react";
import ServiceCard from "../Components/ServiceCard";
import { getAllServices } from "../data/services";
import { initializeServices } from "../lib/initServices";
import { SEARCH_CATEGORIES } from "../data/serviceSeeds";
import {
  categoriesMatch,
  getServiceCategory,
  matchesSearchQuery,
  resolveCategoryPill,
} from "../lib/searchHelpers";
import "./Search.css";

const TIPS = [
  {
    title: "Recherche instantanée",
    text: "Tapez un ou plusieurs mots : chaque mot doit apparaître dans le profil (nom, métier, spécialisation, ville, description, téléphone).",
  },
  {
    title: "Filtre par métier",
    text: "Une pastille limite aux profils de cette catégorie. Touchez-la à nouveau pour tout afficher. Choisir une pastille vide la barre pour tout voir dans la catégorie.",
  },
  {
    title: "Fiche détaillée",
    text: "Touchez ou cliquez une carte pour ouvrir le profil complet : coordonnées, note et description.",
  },
];

export default function Search() {
  const location = useLocation();
  const resultsRef = useRef(null);

  const routeCategoryRaw =
    typeof location.state?.category === "string"
      ? location.state.category
      : "";
  const routeCategoryResolved = resolveCategoryPill(routeCategoryRaw);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    routeCategoryResolved,
  );
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadServicesList = useCallback(async (opts = { signal: null }) => {
    const signal = opts.signal;
    const aborted = () => signal?.aborted;

    setLoading(true);
    setLoadError(false);
    try {
      await initializeServices();
      if (aborted()) return;
      const fetched = await getAllServices();
      if (aborted()) return;
      const list = Array.isArray(fetched)
        ? fetched.filter((s) => s && typeof s === "object")
        : [];
      setServices(list);
    } catch (e) {
      console.error("Erreur chargement services:", e);
      if (!aborted()) {
        setServices([]);
        setLoadError(true);
      }
    } finally {
      if (!aborted()) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const t = setTimeout(() => {
      void loadServicesList({ signal: ac.signal });
    }, 0);
    return () => {
      ac.abort();
      clearTimeout(t);
    };
  }, [loadServicesList]);

  const handleRetryLoad = () => {
    void loadServicesList();
  };

  useEffect(() => {
    if (!routeCategoryResolved) return;
    const id = setTimeout(() => {
      setSelectedCategory(routeCategoryResolved);
      setSearch("");
    }, 0);
    return () => clearTimeout(id);
  }, [routeCategoryResolved]);

  // Auto-scroll aux résultats quand la recherche change
  useEffect(() => {
    if (search.trim() !== "" || selectedCategory !== "") {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [search, selectedCategory]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const cat = getServiceCategory(service);
      const matchesCat =
        selectedCategory === "" || categoriesMatch(cat, selectedCategory);
      if (!matchesCat) return false;
      return matchesSearchQuery(service, search);
    });
  }, [services, search, selectedCategory]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
  };

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const resultCount = filteredServices.length;
  const totalCount = services.length;
  const hasActiveFilters =
    search.trim() !== "" || selectedCategory !== "";

  return (
    <div className="search-page">
      <section className="search-hero" aria-labelledby="search-title">
        <div className="search-hero-inner">
          <p className="search-badge">
            <Sparkles size={16} aria-hidden />
            Trouver un prestataire
          </p>
          <h1 id="search-title">Recherche de services</h1>
          <p className="search-lead">
            Recherchez par nom, métier, spécialisation, ville ou plusieurs mots à la fois. Combinez avec une pastille pour cibler une catégorie.
          </p>
          <p className="search-description">
            Les résultats se mettent à jour pendant que vous tapez. Le bouton « Rechercher » fait défiler jusqu’aux cartes.
          </p>
        </div>
      </section>

      <section className="search-tips" aria-labelledby="search-tips-title">
        <div className="search-section-head">
          <h2 id="search-tips-title">Comment utiliser cette page</h2>
          <p className="search-section-sub">
            Quelques repères pour une recherche rapide et sans frustration.
          </p>
        </div>
        <ul className="search-tip-list">
          {TIPS.map((tip) => (
            <li key={tip.title} className="search-tip-card">
              <h3 className="search-tip-title">{tip.title}</h3>
              <p className="search-tip-text">{tip.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="search-controls" aria-labelledby="search-controls-title">
        <h2 id="search-controls-title" className="visually-hidden">
          Filtres de recherche
        </h2>

        <div className="search-field-wrap">
          <label htmlFor="search-services-input" className="search-label">
            <SearchIcon size={18} aria-hidden />
            Rechercher
          </label>
          <form
            className="search-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              scrollToResults();
            }}
          >
            <input
              id="search-services-input"
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Ex. : Jean, plombier, débouchage, Port-au-Prince…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-describedby="search-hint"
            />
            <button type="submit" className="search-submit-btn">
              <SearchIcon size={18} aria-hidden />
              Rechercher
            </button>
          </form>
          <p id="search-hint" className="search-hint">
            {loading
              ? "Chargement de la liste des services…"
              : loadError
                ? "Impossible de charger les services. Vérifiez la connexion ou les règles Firebase, puis réessayez."
                : `${totalCount} profil${totalCount !== 1 ? "s" : ""} au total dans la base.`}
          </p>
          {loadError && (
            <button
              type="button"
              className="search-retry-btn"
              onClick={handleRetryLoad}
            >
              Réessayer le chargement
            </button>
          )}
        </div>

        <div className="search-categories-block">
          <p className="search-categories-label" id="cat-label">
            <Filter size={16} aria-hidden />
            Catégories
          </p>
          <div
            className="categories"
            role="group"
            aria-labelledby="cat-label"
          >
            {SEARCH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={selectedCategory === cat ? "active" : ""}
                aria-pressed={selectedCategory === cat}
                onClick={() => {
                  if (selectedCategory === cat) {
                    setSelectedCategory("");
                  } else {
                    setSearch("");
                    setSelectedCategory(cat);
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={resultsRef}
        id="search-results"
        className="search-results-section"
        aria-labelledby="results-heading"
      >
        <div className="search-section-head search-results-head">
          <h2 id="results-heading">Résultats</h2>
          <p
            className="search-section-sub"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {!loading &&
              (resultCount === 0
                ? "Aucun profil ne correspond à vos critères pour le moment."
                : `${resultCount} résultat${resultCount !== 1 ? "s" : ""} affiché${resultCount !== 1 ? "s" : ""}.`)}
          </p>
        </div>

        <div className="search-services-container">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`sk-${i}`}
                  className="search-card-skeleton"
                  aria-hidden
                />
              ))}
              <p className="search-loading-msg" role="status" aria-live="polite">
                Chargement des services…
              </p>
            </>
          ) : resultCount > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="search-empty">
              <p className="search-empty-title">Aucun service trouvé</p>
              <p className="search-empty-text">
                {loadError
                  ? "Les données n’ont pas pu être récupérées."
                  : hasActiveFilters
                    ? "Modifiez les mots-clés ou la catégorie. Vous pouvez effacer les filtres ci-dessous."
                    : "Il n’y a encore aucun profil référencé. Revenez plus tard ou proposez le vôtre."}
              </p>
              <div className="search-empty-actions">
                {loadError && (
                  <button
                    type="button"
                    className="search-cta search-cta--primary"
                    onClick={handleRetryLoad}
                  >
                    Réessayer
                  </button>
                )}
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="search-cta search-cta--secondary"
                    onClick={clearFilters}
                  >
                    Effacer les filtres
                  </button>
                )}
                <Link to="/Ajouter" className="search-cta search-cta--primary">
                  Ajouter un service
                </Link>
                <Link to="/home" className="search-cta search-cta--ghost">
                  <Home size={18} aria-hidden />
                  Retour à l’accueil
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
