import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ApplicationHeader from "./components/ApplicationHeader";

function App() {
  return (
      <BrowserRouter>
        <ApplicationHeader/>

        <Routes>
          <Route path="/api/auth/login" element={<LoginPage />}></Route>
          <Route path="/upravljanjeNalozima" element={<UpravljanjeNalozima/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
