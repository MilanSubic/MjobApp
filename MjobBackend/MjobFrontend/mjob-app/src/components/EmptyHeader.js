import React, { useState, useEffect } from "react";

import "../styles/EmptyHeader.css";
import { Link } from "react-router-dom";
import "../pages/Admin/UpravljanjeNalozima/index.css";
import { Badge } from "antd";
import { getCurrentUser } from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { setUnreaded } from "../slices/unreadedSlice";
import { getSveProcitane } from "../services/KonverzacijaService";
import SockJS from "sockjs-client";
import environments from "../environments";
import { over } from "stompjs";

let stompClient = null;

function EmptyHeader() {
  // const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [tipKorisnika, setTipKorisnika] = useState();

  const dispatch = useDispatch();
  const unreaded = useSelector((state) => state.unreaded.value);

  useEffect(() => {
    setTipKorisnika(localStorage.getItem("tipKorisnika"));
    console.log(tipKorisnika);
  });

  const [currentUser] = useState(getCurrentUser());
  const now = Date.now() / 1000;

  useEffect(() => {
    if (currentUser && currentUser.exp > now) {
      getSveProcitane().then(
        (response) => {
          dispatch(setUnreaded(response.data));
        },
        [currentUser]
      );
      if (!stompClient) connect();
    }
  }, []);

  const connect = () => {
    if (currentUser) {
      const Sock = new SockJS(environments().wsUrl);
      stompClient = over(Sock);

      const token = localStorage.getItem("token");
      stompClient.connect(
        { Authorization: `Bearer ${token}` },
        onConnected,
        onError
      );
    }
  };

  const [subscription, setSubscription] = useState();

  const onConnected = () => {
    if (subscription) subscription.unsubscribe();
    setSubscription(
      stompClient.subscribe(
        "/konverzacija/" + currentUser.sub + "/obavjestenje",
        onMessageReceived
      )
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (payload) => {
    dispatch(setUnreaded(true));
  };

  return (
    <div>
      <div className="first-div">
        <div className="logo-div"></div>
        <nav>
          <div className="nav">
            <div className="nav-item">
              <Link to="/home">Početna</Link>
            </div>

            {currentUser && currentUser.exp > now && (
              <div className="nav-item">
                <Badge dot={unreaded} offset={[-5, 20]} size="large">
                  <Link to="/konverzacije">Konverzacije</Link>
                </Badge>
              </div>
            )}
            {tipKorisnika === "admin" && (
              <div style={{ display: "flex" }}>
                <div className="nav-item">
                  <Link to="/kreirajOglas">Kreiraj oglas</Link>
                </div>

                <div className="nav-item">
                  <Link to="/upravljanjeNalozima">Nalozi</Link>
                </div>
              </div>
            )}
            {tipKorisnika === "korisnik" && (
              <div style={{ display: "flex" }}>
                <div className="nav-item">
                  <Link to="/oglasi">Moji oglas</Link>
                </div>
              </div>
            )}

            {tipKorisnika !== null && (
              <>
                <div className="nav-item">
                  <Link to="/mojNalog">Moj nalog</Link>
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
