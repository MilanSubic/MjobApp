import React, { useState, useEffect } from "react";

import "../styles/EmptyHeader.css";
import { Link } from "react-router-dom";

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
              <a href="#">Početna</a>
            </div>
            <div className="nav-item">
              <a href="#">Oglasi</a>
            </div>
            {tipKorisnika !== null && (
              <div className="nav-item">
                <Link to="/konverzacije">Konverzacije</Link>
              </div>
            )}
            <div className="nav-item">
              <a href="#">O nama</a>
            </div>
            <div className="nav-item">
              <a href="#">Kontakt</a>
            </div>
            {!tipKorisnika && (
              <span>
                <div className="nav-item">
                  <Link to="/login">Prijavi se</Link>
                </div>
                <div className="nav-item">
                  <Link to="/signup">Registruj se</Link>
                </div>
              </span>
            )}

            {tipKorisnika === "admin" && (
              <span>
                <div className="nav-item">
                  <a href="#">Oglasi</a>
                </div>
                <div className="nav-item">
                  <a href="/upravljanjeNalozima">Nalozi</a>
                </div>
                <div className="nav-item">
                  <a href="#">Moj nalog</a>
                </div>
              </span>
            )}
            {tipKorisnika && (
              <div className="nav-item">
                <a
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("tipKorisnika");
                    setTipKorisnika();
                    localStorage.removeItem("token");
                  }}
                >
                  Odjava
                </a>
              </div>
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
