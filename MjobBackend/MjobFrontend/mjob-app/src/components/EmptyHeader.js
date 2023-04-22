import React from "react";

import "../styles/EmptyHeader.css";
import { Link } from "react-router-dom";

function EmptyHeader() {
  // const [isNavExpanded, setIsNavExpanded] = useState(false);

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
            <div className="nav-item">
              <a href="#">O nama</a>
            </div>
            <div className="nav-item">
              <a href="#">Kontakt</a>
            </div>
            <div className="nav-item">
              <Link to="/login">Prijavi se</Link>
            </div>
            <div className="nav-item">
              <Link to="/signup">Registruj se</Link>
            </div>
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
