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
import MojNalog from "./pages/MojNalog";
import { CreatAdPage } from "./pages/CreateAdPage";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
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
          <Route path="/mojNalog" element={<MojNalog />}></Route>
          <Route
            path="/upravljanjeNalozima"
            element={<UpravljanjeNalozima />}
          ></Route>
          <Route path="/konverzacije" element={<Konverzacija />}></Route>
          <Route path="/kreirajOglas" element={<CreatAdPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
