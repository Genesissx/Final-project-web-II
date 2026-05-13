import { useNavigate } from "react-router-dom";
import ServiceForm from "../Components/ServiceForm";
import { addService } from "../data/services";

export default function Ajouter() {
  const navigate = useNavigate();

  const handleAdd = async (service) => {
    try {
      await addService(service);
      navigate("/search");
    } catch (error) {
      console.error("Erreur lors de l'ajout du service :", error.message);
    }
  };

  return <ServiceForm onAdd={handleAdd} />;
}
