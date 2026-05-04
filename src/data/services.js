const defaultServices = [
  {
    id: "1",
    name: "Jean Dupont",
    category: "Plombier",
    specialization: "Réparation de tuyaux et débouchage",
    location: "Delmas 32, Port-au-Prince",
    rating: 8.0,
    phone: "50936123456",
    schedule: "Lun - Sam : 8h00 - 18h00",
    status: "Disponible",
    description:
      "Plombier professionnel avec plus de 8 ans d'expérience. Spécialisé dans les installations, réparations de tuyaux, débouchage, fuites d'eau et entretien général.",
    avatar:
      "https://images.unsplash.com/photo-1659353588842-891391e6fcd4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Raymond Toussaint",
    category: "Électricien",
    specialization: "Installation électrique résidentielle",
    location: "Pacot, Port-au-Prince",
    rating: 9.2,
    phone: "50934112233",
    schedule: "Lun - Ven : 8h00 - 17h00",
    status: "Disponible",
    description:
      "Électricienne expérimentée offrant des installations sûres, réparations rapides et service de maintenance résidentielle et commerciale.",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Samuel Laurent",
    category: "Photographe",
    specialization: "Événements et portraits",
    location: "Carrefour",
    rating: 8.6,
    phone: "50955123456",
    schedule: "Mar - Sam : 9h00 - 18h00",
    status: "Disponible",
    description:
      "Passionné par l’image et le détail, ce photographe met son expertise au service de vos moments les plus importants. Que ce soit pour des événements, des portraits, des séances lifestyle ou des projets professionnels, il capture chaque instant avec créativité et précision.",
    avatar:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=400&q=80",
  },
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
