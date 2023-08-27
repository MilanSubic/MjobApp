import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmptyHeader from "./components/EmptyHeader";
import Login from "./components/Login";
import { Registracija } from "./pages/Registracija";
import UpravljanjeNalozima from "./pages/Admin/UpravljanjeNalozima";
import { UsersList } from "./components/UsersList";
import Oglasi from "./pages/OglasiKorisnik";
import MojiOglasi from "./pages/OglasiNarucilac";
import JavniOglasi from "./pages/JavniOglasi/JavniOglasi";
import { Konverzacija } from "./pages/Konverzacija";
import Home from "./pages/Home";
import OglasDetalji from "./pages/OglasDetalji";
function App() {
  return (
    <BrowserRouter>
      <EmptyHeader />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="users" element={<UsersList />}></Route>
        <Route path="signup" element={<Registracija />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="/api/oglasi/:id" element={<OglasDetalji />} />
        <Route path="/oglasi" element={<Oglasi />}></Route>
        <Route path="/mojiOglasi" element={<MojiOglasi />}></Route>
        <Route path="/javniOglasi" element={<JavniOglasi />}></Route>
        <Route
          path="/upravljanjeNalozima"
          element={<UpravljanjeNalozima />}
        ></Route>
        <Route path="/konverzacije" element={<Konverzacija />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
