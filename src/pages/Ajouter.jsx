import { useNavigate } from "react-router-dom";
import ServiceForm from "../Components/ServiceForm";
import { addService } from "../data/services";

export default function Ajouter() {
  const navigate = useNavigate();

  const handleAdd = (service) => {
    addService(service);
    setTimeout(() => navigate("/search"), 2600);
  };

  return <ServiceForm onAdd={handleAdd} />;
}
