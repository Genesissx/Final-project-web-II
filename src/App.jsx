import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Profil from "./pages/Profil"

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ["/", "/login", "/signup", "/terms"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
        <NavBar />
      <Routes>
         
        <Route path="/" element={<LogIn />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Ajouter" element={<Ajouter />} />
        <Route path="*" element={<LogIn />} />
         <Route path="/About" element={<About />} />
      </Routes>
      {/* {showFooter && <Footer />} */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App
