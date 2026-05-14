import { SEARCH_CATEGORIES } from "../data/serviceSeeds";

export function normalizeText(str) {
  if (str == null) return "";
  const s = typeof str === "string" ? str : String(str);
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function pickString(obj, ...keys) {
  if (!obj || typeof obj !== "object") return "";
  for (const k of keys) {
    const v = obj[k];
    if (v != null && String(v).trim() !== "") return String(v);
  }
  return "";
}

/** Catégorie / métier (tolère les variantes de clés venant de la BDD). */
export function getServiceCategory(service) {
  const category = pickString(
    service,
    "category",
    "Category",
    "categorie",
    "Categorie",
    "type",
    "Type",
    "metier",
    "Metier",
  );
  
  // Si la catégorie n'est pas trouvée, essayer de la déduire de la spécialisation
  if (!category) {
    const specialization = pickString(
      service,
      "specialization",
      "specialite",
      "Specialisation",
      "Specialization",
    );
    
    // Essayer de matcher la spécialisation avec une catégorie
    if (specialization) {
      for (const cat of SEARCH_CATEGORIES) {
        if (normalizeText(specialization).includes(normalizeText(cat))) {
          return cat;
        }
      }
    }
  }
  
  return category;
}

export function categoriesMatch(serviceCategory, selected) {
  if (!selected) return true;
  const a = normalizeText(serviceCategory ?? "");
  const b = normalizeText(selected);
  if (!a || !b) return false;
  return a === b;
}

export function resolveCategoryPill(raw) {
  if (typeof raw !== "string" || !raw.trim()) return "";
  const t = raw.trim();
  if (SEARCH_CATEGORIES.includes(t)) return t;
  return SEARCH_CATEGORIES.find((c) => categoriesMatch(c, t)) ?? "";
}

/** Texte unique normalisé pour recherche (tous champs utiles + téléphone chiffres). */
export function buildSearchHaystack(service) {
  if (!service || typeof service !== "object") return "";
  const phoneDigits = pickString(service, "phone", "Phone").replace(/\D/g, "");
  const parts = [
    pickString(service, "name", "Name", "nom", "Nom"),
    getServiceCategory(service),
    pickString(
      service,
      "specialization",
      "specialite",
      "Specialisation",
      "Specialization",
    ),
    pickString(service, "location", "Location", "adresse", "Adresse"),
    pickString(service, "description", "Description"),
    pickString(service, "schedule", "Schedule", "disponibilite", "availability"),
    pickString(service, "status", "Status"),
    phoneDigits,
  ];
  return normalizeText(parts.join(" "));
}

/**
 * Recherche par mots : chaque mot doit apparaître quelque part dans l’ensemble des champs.
 * Ex. « jean plomb » trouve un plombier prénommé Jean.
 */
export function matchesSearchQuery(service, queryRaw) {
  const hay = buildSearchHaystack(service);
  const q = normalizeText(queryRaw);
  if (!q) return true;
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((t) => hay.includes(t));
}
