import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Search from "./pages/Search";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Detail from "./pages/detail";
import Terms from "./pages/terms";

import Contact from "./pages/Contact";
import Ajouter from "./pages/Ajouter";

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ["/", "/login", "/signup", "/terms"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Ajouter" element={<Ajouter />} />
        <Route path="*" element={<LogIn />} />
      </Routes>
      {showFooter && <Footer />}
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
