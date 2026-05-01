import "./about.css"
import { FaCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
export default function About(){
    return(
        <>
        <section className="hero">
             <section className="hero-1">
    <div className="hero-retour">SC</div>
         <h2  className="icon"><FaArrowLeft/> Retour</h2>
    <div className="fonde">Fondé en 2026 · Haïti</div>
    <h1>Connecter les talents<br/>aux <em>besoins réels</em></h1>
    <p className="hero-para">Service Connect rapproche rapidement les personnes qui cherchent un service fiable et les professionnels compétents qui cherchent des opportunités de travail.</p>
  </section>

   <div className="intro">
    <p>Bienvenue sur Service Connect, une plateforme née d’un besoin réel en Haïti : rapprocher rapidement les personnes qui cherchent un service fiable et les professionnels compétents qui cherchent des opportunités de travail.Dans un contexte où trouver un artisan qualifié, un technicien disponible ou un prestataire de confiance peut être difficile, nous avons imaginé une solution simple, moderne et accessible. Service Connect permet de connecter en quelques clics des clients avec des professionnels vérifiés dans plusieurs domaines : plomberie, électricité, informatique, ménage, livraison, réparation et bien plus encore.
            </p>
  </div>
  
        <div className="about">
          
      
             <div className="about-card">
            <h2><FaCircle className="circle1"/> Notre Histoire</h2>
            <p>
                Service Connect a vu le jour en 2026, à une période où de nombreuses familles et entreprises en Haïti faisaient face à de grands défis : déplacements compliqués, insécurité dans certaines zones, chômage croissant et difficulté à accéder rapidement à des services essentiels.<br/><br/>L’idée est née d’un constat simple : pendant que des milliers de travailleurs qualifiés peinaient à trouver des clients réguliers, de nombreuses personnes perdaient du temps à chercher quelqu’un de disponible et compétent pour effectuer un travail urgent.
            </p>
           </div>
           <div className="about-card">
            <h2><FaCircle className="circle2"/> Notre Vision</h2>
            <p>
                Nous croyons qu’en utilisant la technologie de manière intelligente, Haïti peut développer une économie plus connectée, plus efficace et plus inclusive.Notre ambition est de devenir la plateforme de référence pour les services professionnels dans tout le pays, puis dans la région caribéenne.<br/><br/>Ensemble, construisons l’avenir. Nous croyons que chaque compétence mérite d’être valorisée et que chaque besoin mérite une solution rapide. Nous créons des opportunités, renforçons les communautés et participons à la reconstruction économique d’Haïti
            </p>
           </div>
        </div>

          <div className="domains">
    <h2>Nos domaines d'intervention</h2>
    <p className="domains-sub">Des professionnels vérifiés à portée de clic</p>
    <div className="tags">
      <div className="tag">🔧 Plomberie</div>
      <div className="tag">⚡ Électricité</div>
      <div className="tag">💻 Informatique</div>
      <div className="tag">🧹 Ménage</div>
      <div className="tag">🚚 Livraison</div>
      <div className="tag">🔨 Réparation</div>
      <div className="tag">🎨 Peinture</div>
      <div className="tag">📦 Déménagement</div>
    </div>
  </div>
  <div className="foot">
    <p>&copy; 2026 <strong>Service Connect</strong> · Connecter Haïti, une mission à la fois.</p>
  </div>
        </section>
        </>
    )
}