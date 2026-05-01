export default function ServiceCard({nom, service, numero, adresse, description}){
    return(
        <div className="employee-card">
            <div className="employee-card-header">
                <h3>{nom}</h3>
               
            </div>
            <div className="employee-card-body">
                <p><strong>service:</strong> {service}</p>
                <p><strong>Numero:</strong> {numero}</p>
                 <p><strong>Adresse:</strong> {adresse}</p>
                  <p><strong>Description:</strong> {description}</p>
                   
            </div>
        </div>
    )
}