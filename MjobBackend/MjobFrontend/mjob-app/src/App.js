import LoginPage from "./pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/auth/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
