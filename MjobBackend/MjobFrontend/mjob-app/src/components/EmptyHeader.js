import React, { useState, useEffect } from "react";

import "../styles/EmptyHeader.css";
import { Link } from "react-router-dom";
import "../pages/Admin/UpravljanjeNalozima/index.css";
function EmptyHeader() {
  // const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [tipKorisnika, setTipKorisnika] = useState();
  useEffect(() => {
    setTipKorisnika(localStorage.getItem("tipKorisnika"));
    console.log(tipKorisnika);
  });
  return (
    <div>
      <div className="first-div">
        <div className="logo-div"></div>
        <nav>
          <div className="nav">
            <div className="nav-item">
              <Link to="/home">Početna</Link>
            </div>

            {tipKorisnika !== null && (
              <div className="nav-item">
                <Link to="/konverzacije">Konverzacije</Link>
              </div>
            )}
            {tipKorisnika === "admin" && (
              <div style={{ display: "flex" }}>
                <div className="nav-item">
                  <a href="/kreirajOglas">Kreiraj oglas</a>
                </div>

                <div className="nav-item">
                  <a href="/upravljanjeNalozima">Nalozi</a>
                </div>
              </div>
            )}
            {tipKorisnika === "korisnik" && (
              <div style={{ display: "flex" }}>
                <div className="nav-item">
                  <a href="/oglasi">Moji oglasi</a>
                </div>
              </div>
            )}

            {tipKorisnika !== null && (
              <>
                <div className="nav-item">
                  <a href="/mojNalog">Moj nalog</a>
                </div>
                <div className="nav-item">
                  <a
                    href="/home"
                    onClick={() => {
                      localStorage.removeItem("tipKorisnika");
                      localStorage.removeItem("token");
                    }}
                  >
                    Odjava
                  </a>
                </div>
              </>
            )}
            {tipKorisnika === null && (
              <>
                <div className="nav-item">
                  <Link to="/login">Prijavi se</Link>
                </div>
                <div className="nav-item">
                  <Link to="/signup">Registruj se</Link>
                </div>
              </>
            )}
          </div>
        </nav>
        <div className="nav-menu">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
        </div>
      </div>
    </div>
  );
}

export default EmptyHeader;
