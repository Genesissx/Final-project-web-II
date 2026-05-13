const defaultServices = [
  // CATEGORY: Popular Projects
  {
    id: "1",
    name: "Furniture Assembly",
    category: "Popular Projects",
    specialization: "Projects starting at $49",
    location: "Delmas 32, Port-au-Prince",
    rating: 8.0,
    phone: "50936123456",
    schedule: "Lun - Sam : 8h00 - 18h00",
    status: "Disponible",
    description: "Montage de meubles professionnel.",
    avatar: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Mount Art or Shelves",
    category: "Popular Projects",
    specialization: "Projects starting at $65",
    location: "Pacot, Port-au-Prince",
    rating: 9.2,
    phone: "50934112233",
    schedule: "Lun - Ven : 8h00 - 17h00",
    status: "Disponible",
    description: "Installation de cadres et d'étagères.",
    avatar: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Mount a TV",
    category: "Popular Projects",
    specialization: "Projects starting at $69",
    location: "Carrefour",
    rating: 8.6,
    phone: "50955123456",
    schedule: "Mar - Sam : 9h00 - 18h00",
    status: "Disponible",
    description: "Fixation murale de téléviseurs.",
    avatar: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Help Moving",
    category: "Popular Projects",
    specialization: "Projects starting at $67",
    location: "Pétion-Ville",
    rating: 9.0,
    phone: "50937123456",
    schedule: "Lun - Dim : 24/7",
    status: "Disponible",
    description: "Aide au déménagement et transport.",
    avatar: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Home & Apartment Cleaning",
    category: "Popular Projects",
    specialization: "Projects starting at $49",
    location: "Tabarre",
    rating: 8.8,
    phone: "50938123456",
    schedule: "Lun - Sam : 7h00 - 19h00",
    status: "Disponible",
    description: "Nettoyage complet de maisons et appartements.",
    avatar: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Minor Plumbing Repairs",
    category: "Popular Projects",
    specialization: "Projects starting at $74",
    location: "Delmas",
    rating: 8.5,
    phone: "50939123456",
    schedule: "Lun - Ven : 8h00 - 18h00",
    status: "Disponible",
    description: "Petites réparations de plomberie.",
    avatar: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Electrical Help",
    category: "Popular Projects",
    specialization: "Projects starting at $69",
    location: "Cité Soleil",
    rating: 8.2,
    phone: "50940123456",
    schedule: "Lun - Sam : 8h00 - 17h00",
    status: "Disponible",
    description: "Aide pour installations électriques.",
    avatar: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Heavy Lifting",
    category: "Popular Projects",
    specialization: "Projects starting at $61",
    location: "Lalue",
    rating: 8.9,
    phone: "50941123456",
    schedule: "Lun - Sam : 9h00 - 18h00",
    status: "Disponible",
    description: "Manutention et levage de charges lourdes.",
    avatar: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=400&auto=format&fit=crop",
  },
  // CATEGORY: Handyman Services
  {
    id: "9",
    name: "Door Repair",
    category: "Handyman Services",
    specialization: "Projects starting at $55",
    location: "Delmas 48",
    rating: 8.7,
    phone: "50942123456",
    schedule: "Lun - Sam : 8h00 - 17h00",
    status: "Disponible",
    description: "Réparation de portes et serrures.",
    avatar: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Painting Services",
    category: "Handyman Services",
    specialization: "Projects starting at $80",
    location: "Pétion-Ville",
    rating: 9.1,
    phone: "50943123456",
    schedule: "Lun - Ven : 7h00 - 16h00",
    status: "Disponible",
    description: "Peinture intérieure et extérieure.",
    avatar: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop",
  }
];

const addedServices = [];

export function getAllServices() {
  return [...defaultServices, ...addedServices];
}

export function addService(service) {
  addedServices.push(service);
}

export function findServiceById(id) {
  return getAllServices().find((service) => service.id === id);
}

export default defaultServices;
