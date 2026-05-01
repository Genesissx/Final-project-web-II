import "./footer.css";
import { Link } from "react-router-dom";
import { Home, Search, PlusCircle, Phone, User } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <nav className="nav">

      <a className="nav-1">
        <Home size={22} />
        <span>Home</span>
      </a>

      <a className="nav-1">
        <Search size={22} />
        <span>Recherche</span>
      </a>

      <Link to="/Ajouter"><a className="nav-1">
        <div className="nav-plus">
          <PlusCircle size={26} />
        </div>
      </a></Link>

      <Link to="/Contact"><a className="nav-1">
        <Phone size={22} />
        <span>Contact</span>
      </a></Link>

      <a className="nav-1">
        <User size={22} />
        <span>Profil</span>
      </a>

    </nav>
  )
}