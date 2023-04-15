import { Button } from '@mui/material';
import React, { useState } from "react";
import {FaBars} from "react-icons/fa"
import {Nav, NavbarContainer, NavLogo, NavMenu, NavItem, NavLinks, NavButton, NavButtonLink} from './Navbar';
import {animateScroll as scroll} from 'react-scroll'
import Image from '../../../../images/logo.png'

const toggleHome= () =>{
    scroll.scrollToTop();
}
export const Navbar = ({ toggle }) => {

    const [logInModalVisible, setLogInModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [signInModalVisible, setSignInModalVisible] = useState(false);

    const closeLogInModal = () => {
        setModalLoading(false);
        setLogInModalVisible(false);
    };
    const closeSignInModal = () => {
        setModalLoading(false);
        setSignInModalVisible(false);
    };
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/" onClick={toggleHome}>
                        <img width={160} src={Image}></img>
                    </NavLogo>

                    <NavMenu>
                        <NavItem>
                            <NavLinks to="Prva"
                                      smooth={true}
                                      duration={500}
                                      spy={true}
                                      exact={true}
                                      offset={-80}
                            >
                                Početna
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="usluge"
                                      smooth={true}
                                      duration={500}
                                      spy={true}
                                      exact={true}
                                      offset={-80}
                            >
                                Usluge
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="registracija"

                                      smooth={true}
                                      duration={500}
                                      spy={true}
                                      exact={true}
                                      offset={-80}
                            >
                                Registracija

                            </NavLinks>
                        </NavItem>
                    </NavMenu>

                    <NavButton

                    >
                        <Button
                            style={{ width: 150,height: 40, backgroundColor: "#d33d17", alignSelf: "center"}}
                            variant="contained"
                            type='link'
                            onClick={() => setLogInModalVisible(true)}
                        >Prijava</Button>
                    </NavButton>
                </NavbarContainer>

            </Nav>
        </>
    );
};