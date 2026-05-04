import "./footer.css";
import { Link } from "react-router-dom";
import { Home, Search, PlusCircle, Phone, User } from 'lucide-react';

export default function Footer() {
  return (
    <nav className="nav">

      <Link to="/home" className="nav-1">
        <Home size={22} />
        <span>Home</span>
      </Link>

      <Link to="/search" className="nav-1">
        <Search size={22} />
        <span>Recherche</span>
      </Link>

      <Link to="/Ajouter" className="nav-1">
        <div className="nav-plus">
          <PlusCircle size={26} />
        </div>
      </Link>

      <Link to="/Contact" className="nav-1">
        <Phone size={22} />
        <span>Contact</span>
      </Link>

      <Link to="/About" className="nav-1">
        <User size={22} />
        <span>About</span>
      </Link>

    </nav>
  )
}