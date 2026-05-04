import "./contact.css"
import { FaArrowLeft } from "react-icons/fa";
import {Send } from 'lucide-react'
import { Link } from "react-router-dom";
export default function Contact(){
    return(
        <>
        <div className="contact">
           
             <div className="title-contact">
                <Link to={"/Home"}><h2  className="icon"><FaArrowLeft/> Retour</h2></Link>
                <h1>Contacter nous</h1>
                <p>Comment pouvons-nous améliorer votre expérience ?</p>
            </div>
             
              <div className="form-card">
               <div className="field">
        <label>Nom complet</label>
        <input type="text" id="nom" placeholder="Ex : Jean-Pierre Dupont" />
      </div>

      <div className="field">
        <label>Adresse email</label>
        <input type="email" id="email" placeholder="exemple@email.com" />
      </div>

      <div className="field">
        <label>Message</label>
        <textarea id="message" placeholder="Décrivez votre demande ici..."></textarea>
      </div>

         <div className="field">
          <button  className="send-btn">
            <Send size={18} />
              Envoyer le message
          </button>
         </div>
          <div className="contact-band">
            <p>Une question, une suggestion ou besoin d'aide ? Écrivez-nous, nous vous répondons rapidement.</p>
          </div>
        </div>
        </div>
        </>
    )
}