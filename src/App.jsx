import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Search from "./pages/Search";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";
import Terms from "./pages/terms";
import About from "./pages/About"
import Contact from "./pages/Contact";
import Ajouter from "./pages/Ajouter";
import Profil from "./pages/Profil";
import EditProfile from "./pages/EditProfile";
import Help from "./pages/Help";
import Footer from "./Components/Footer";

function AppContent() {
  const location = useLocation();
  const hideNavRoutes = ["/", "/login", "/signup"];
  const hideFooterRoutes = ["/", "/login", "/signup", "/terms"];
  const showNav = !hideNavRoutes.includes(location.pathname);
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="app">
      {showNav && <NavBar />}
      <main className={showNav ? "app-main with-navbar" : "app-main"}>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Ajouter" element={<Ajouter />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<LogIn />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App
