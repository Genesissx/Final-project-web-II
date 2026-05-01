import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";

import Contact from "./pages/Contact";
import Ajouter from "./pages/Ajouter";
function App() {


  return (
    <>
      <BrowserRouter>
       <Routes>
           <Route path="/Contact" element={<Contact/>}/>
           <Route path="/Ajouter" element={<Ajouter/>}/>
       </Routes>
       <Footer/>
       </BrowserRouter>
    
    </>
  )
}

export default App
