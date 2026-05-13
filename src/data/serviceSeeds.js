/**
 * Catégories à afficher dans la recherche (doivent correspondre aux pastilles).
 */
export const SEARCH_CATEGORIES = [
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

/** Sections sur la page d’accueil (sous-ensemble des catégories). */
export const HOME_CATEGORY_SECTIONS = [
  "Plombier",
  "Électricien",
  "Photographe",
  "Coiffeur",
  "Mécanicien",
  "Ménage",
];

const FIRST_NAMES = [
  "Jean",
  "Marie",
  "Samuel",
  "Carole",
  "Paul",
  "Sophie",
  "Daniel",
  "Claude",
  "Annick",
  "Thierry",
  "Raymond",
  "Laura",
  "Marc",
  "Julie",
  "Kevin",
  "Patricia",
  "Steve",
  "Nadia",
  "Wilson",
  "Mireille",
  "Peter",
  "Edline",
  "Ralph",
  "Bianca",
];

const LAST_NAMES = [
  "Dupont",
  "Toussaint",
  "Laurent",
  "Pierre",
  "Métellus",
  "Bien-Aimé",
  "Joseph",
  "Louissaint",
  "Narcisse",
  "Destin",
  "Beauvoir",
  "Olivier",
  "Jean",
  "Charles",
  "Noël",
  "Augustin",
  "Michel",
  "Cadet",
  "Romulus",
  "Estimé",
  "Paul",
  "Guillaume",
  "Blanc",
  "Etienne",
];

const LOCATIONS = [
  "Delmas 32, Port-au-Prince",
  "Pétion-Ville",
  "Tabarre",
  "Carrefour",
  "Pacot, Port-au-Prince",
  "Croix-des-Bouquets",
  "Morne-à-Tuf",
  "Naissain",
  "Cité Soleil",
  "Gonaïves",
];

const AVATAR_POOL = [
  "https://images.unsplash.com/photo-1659353588842-891391e6fcd4?q=80&w=870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1589939705882-dd1b07bfcc60?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1560883676-d81fcf010dd0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1584622181563-430f63602d4b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1586528116055-c0ec468b37b0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
];

/** Six spécialisations distinctes par métier (nom du métier / domaine). */
const SPECIALIZATIONS_BY_CATEGORY = {
  Plombier: [
    "Réparation de tuyaux et débouchage",
    "Installation sanitaire et chauffe-eau",
    "Fuites, colonnes et rénovation salle de bain",
    "Réseau PVC et évacuations",
    "Dépannage urgent et désembouage",
    "Entretien général et mise aux normes",
  ],
  Électricien: [
    "Installation résidentielle et commerciale",
    "Tableaux électriques et mise à la terre",
    "Dépannage et diagnostic sur site",
    "Éclairage LED et domotique basique",
    "Climatisation et lignes dédiées",
    "Mise aux normes et sécurité",
  ],
  Mécanicien: [
    "Réparation moteur et transmission",
    "Freinage, suspension et géométrie",
    "Diagnostic électronique véhicule",
    "Vidange et entretien périodique",
    "Climatisation automobile",
    "Pneumatiques et équilibrage",
  ],
  Technicien: [
    "Maintenance équipements industriels",
    "Installation et calibration capteurs",
    "Dépannage électromécanique",
    "Contrôle qualité sur ligne",
    "Formation utilisateurs sur site",
    "Contrats de maintenance préventive",
  ],
  Photographe: [
    "Événements et portraits professionnels",
    "Mariage et reportage lifestyle",
    "Produit et shooting studio",
    "Vidéo courte et montage léger",
    "Retouche et livraison HD",
    "Couverture corporate et équipes",
  ],
  Jardinier: [
    "Tonte, taille et entretien espaces verts",
    "Aménagement paysager et massifs",
    "Arrosage automatique et arrosage goutte à goutte",
    "Plantation et saisonniers",
    "Élagage et sécurisation",
    "Compost et entretien bio",
  ],
  Peintre: [
    "Peinture intérieure et finitions",
    "Façades et enduits extérieurs",
    "Rénovation après dégâts des eaux",
    "Préparation des supports",
    "Peinture décorative et effets",
    "Devis et chantiers clés en main",
  ],
  Informaticien: [
    "Réparation PC et maintenance matérielle",
    "Installation logiciels et antivirus",
    "Réseau domestique et Wi-Fi",
    "Sauvegarde et récupération de données",
    "Support à distance et formation",
    "Petites migrations cloud et e-mail",
  ],
  Coiffeur: [
    "Coupe femme et homme",
    "Coloration et balayage",
    "Soins capillaires et lissage",
    "Coiffure mariage et événements",
    "Barbe et taille précise",
    "Conseil image et produits",
  ],
  Ménage: [
    "Nettoyage résidentiel régulier",
    "Grand nettoyage et dégraissage",
    "Bureaux et espaces commerciaux",
    "Après travaux et mise en état",
    "Repassage et aide ponctuelle",
    "Produits écologiques sur demande",
  ],
  Livraison: [
    "Livraison express centre-ville",
    "Courses et colis légers",
    "Plage horaire étendue",
    "Suivi contact client",
    "Livraison multi-arrêts",
    "Service récurrent entreprises",
  ],
  Réparation: [
    "Petit électroménager et outillage",
    "Réparation générale à domicile",
    "Montage meubles et réglages",
    "Objets du quotidien",
    "Diagnostic avant devis",
    "Pièces de rechange courantes",
  ],
  Serrurier: [
    "Ouverture de porte et urgences",
    "Changement de cylindre et blindage",
    "Reproduction de clés",
    "Portes et interphones",
    "Rideaux métalliques",
    "Conseil sécurité résidentielle",
  ],
  Cuisine: [
    "Préparation de repas à domicile",
    "Buffets et petits événements",
    "Menus équilibrés sur mesure",
    "Cours de cuisine privés",
    "Courses et mise en place",
    "Spécialités locales et fusion",
  ],
  Jardinage: [
    "Potagers et semis",
    "Taille fruitiers et haies",
    "Traitement naturel et conseils sol",
    "Irrigation et récupération d’eau",
    "Compost et paillage",
    "Aménagement durable petits espaces",
  ],
  "Garde d'enfant": [
    "Garde à domicile ponctuelle",
    "Sorties d’école et aide aux devoirs",
    "Garde week-end et soirées",
    "Activités ludiques et lecture",
    "Accompagnement nourrissons",
    "Garde récurrente contrat long",
  ],
  "Community manager": [
    "Animation réseaux sociaux",
    "Calendrier éditorial et posts",
    "Modération et réponses commentaires",
    "Reporting simple et stats",
    "Campagnes publicitaires légères",
    "Création visuels simples et stories",
  ],
};

function slugForCategory(cat) {
  return cat
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function buildSeed(category, indexInCat, globalIndex) {
  const slug = slugForCategory(category);
  const seedKey = `seed-${slug}-${indexInCat + 1}`;
  const specs = SPECIALIZATIONS_BY_CATEGORY[category];
  const fi = (globalIndex + indexInCat * 3) % FIRST_NAMES.length;
  const li = (globalIndex * 2 + indexInCat) % LAST_NAMES.length;
  const rating = Math.round((7.4 + ((globalIndex + indexInCat) % 18) * 0.1) * 10) / 10;
  const localPhone =
    31000000 +
    ((globalIndex * 104729 + indexInCat * 224737) % 38999999);

  return {
    seedKey,
    name: `${FIRST_NAMES[fi]} ${LAST_NAMES[li]}`,
    category,
    specialization: specs[indexInCat],
    location: LOCATIONS[(globalIndex + indexInCat) % LOCATIONS.length],
    rating,
    phone: `509${String(localPhone).slice(0, 8)}`,
    schedule: "Lun - Sam : 8h00 - 18h00",
    status: "Disponible",
    description: `${category} — ${specs[indexInCat]}. Prestataire référencé sur Service Connect.`,
    avatar: AVATAR_POOL[(globalIndex + indexInCat) % AVATAR_POOL.length],
  };
}

function buildAllServiceSeeds() {
  const out = [];
  let globalIndex = 0;
  for (const category of SEARCH_CATEGORIES) {
    for (let i = 0; i < 6; i++) {
      out.push(buildSeed(category, i, globalIndex));
      globalIndex++;
    }
  }
  return out;
}

export const ALL_SERVICE_SEEDS = buildAllServiceSeeds();
