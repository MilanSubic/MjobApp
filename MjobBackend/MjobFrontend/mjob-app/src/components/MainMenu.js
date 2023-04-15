import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./MainMenu.css";
const MainMenu = (props) => {
    return (
        <Menu
            theme="light"
            mode="horizontal"
        >
                <>

                    <Menu.Item key={"/oglasi"}>
                        <Link to={"/oglasi"}>{"Oglasi"}</Link>
                    </Menu.Item>
                    <Menu.Item key={"/upravljanjeNalozima"}>
                        <Link to={"/upravljanjeNalozima"}>Zahtjevi za registraciju</Link>
                    </Menu.Item>
                    <Menu.Item key={"/korisnici"}>
                        <Link to={"/korisnici"}>{"Korisnici"}</Link>
                    </Menu.Item>
                    <Menu.Item key={"/narucioci"}>
                        <Link to={"narucioci"}>{"Narucioci"}</Link>
                    </Menu.Item>
                    <Menu.Item key={"/mojProfil"}>
                        <Link to={"/mojProfil"}>{"Moj profil"}</Link>
                    </Menu.Item>
                </>
        </Menu>
    );
};

MainMenu.propTypes = {
    location: PropTypes.object,
    role: PropTypes.string,
};

export default MainMenu;