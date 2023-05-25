import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmptyHeader from "./components/EmptyHeader";
import Login from "./components/Login";
import { SignUpPage } from "./pages/SignUpPage";
import UpravljanjeNalozima from "./pages/Admin/UpravljanjeNalozima";
function App() {
  return (
    <BrowserRouter>
      <EmptyHeader />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="/upravljanjeNalozima" element={<UpravljanjeNalozima />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
