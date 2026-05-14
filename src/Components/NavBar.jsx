import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import "./navbar.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/Home" className="navbar-logo">
          <div className="logo-box">SC</div>
          <div className="logo-text">
            <h2>Service Connect</h2>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="navbar-links">
          <NavLink to="/Home">Accueil</NavLink>
          <NavLink to="/Search">Recherche</NavLink>
          <NavLink to="/Ajouter">Ajouter un service</NavLink>
          <NavLink to="/About">À propos</NavLink>
          <NavLink to="/Contact">Contact</NavLink>
            <NavLink to="/Profil">Profil</NavLink>
        </nav>

        {/* MOBILE BUTTON */}
         <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div> 

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "active" : ""}`}>
        <NavLink to="/Home" onClick={closeMenu}>
          Accueil
        </NavLink>

        <NavLink to="/Search" onClick={closeMenu}>
          Recherche
        </NavLink>

        <NavLink to="/Ajouter" onClick={closeMenu}>
          Ajouter un service
        </NavLink>

        <NavLink to="/About" onClick={closeMenu}>
          À propos
        </NavLink> 

        <NavLink to="/Contact" onClick={closeMenu}>
          Contact
        </NavLink>

      </div>
    </header>
  );
}