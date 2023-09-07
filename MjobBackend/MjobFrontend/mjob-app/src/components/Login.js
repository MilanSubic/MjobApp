import { Input } from "antd";
import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import korisnikService from "../services/korisnik.service";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const hadleClick = async (e) => {
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("reloadCount", "1");
      korisnikService.getUserByUsername(user.username).then((res) => {
        console.log(res.korisnikTipNaziv);
        localStorage.setItem("tipKorisnika", res.korisnikTipNaziv);
      });
      /* const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }; */
      console.log("Uspjesno ste se ulogovali");
      console.log(jwt);
      navigate("/home");
    } catch (error) {
      console.log("Niste se uspjesno ulogovali");
    }
  };

  return (
    <div>
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Dobro došli.</h1>
            <p>Studiraš? Učenik si? Želiš posao? Na pravom si mjestu!</p>
          </div>
        </div>

        <div className="right">
          <h1>Prijavi se</h1>
          <Link to="/signup">Registruj se</Link>

          <div className="inputs">
            <Input
              type="text"
              placeholder="korisničko ime"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            />

            <Input
              type="password"
              placeholder="lozinka"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="login-button" onClick={hadleClick}>
            Prijavi se
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
