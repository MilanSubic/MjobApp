import React from "react";
import { useState } from "react";
import "../styles/EmptyHeader.css";

function EmptyHeader() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
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
            <a href="#">Prijavi se</a>
          </div>
        </div>
      </nav>
      <div className="nav-menu">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
      </div>
    </div>
  );
}

export default EmptyHeader;
