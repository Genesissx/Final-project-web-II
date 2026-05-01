import ServiceForm from "../Components/ServiceForm";

export default function Ajouter(){
    const handleAdd = (user) => {
    console.log("Nouvel employé ajouté :", user)
   
  }
    return(
        <>
        <ServiceForm onAdd={handleAdd}/>
        
        </>
    )
}