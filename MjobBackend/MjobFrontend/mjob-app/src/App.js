import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmptyHeader from "./components/EmptyHeader";
import Login from "./components/Login";
import { Registracija } from "./pages/Registracija";
import UpravljanjeNalozima from "./pages/Admin/UpravljanjeNalozima";
import { UsersList } from "./components/UsersList";
import { Konverzacija } from "./pages/Konverzacija";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <EmptyHeader />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="users" element={<UsersList />}></Route>
        <Route path="signup" element={<Registracija />}></Route>
        <Route path="home" element={<Home />}></Route>
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
