import React from "react";
import Image from "../images/logo.png";
import styled from "styled-components";
import MainMenu from "./MainMenu";
const Header = styled.div`
  background-color: transparent;
  justify-content: space-between;
  display: flex;
  height: 80px;
  line-height: 48px;
  padding: 0 25px;
  align-items: center;
`;


const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
`;
const ApplicationHeader=()=>
{
    return(<div><Header> <LeftSide>
        <div><img width={160} src={Image}></img></div>

    </LeftSide>
        <RightSide>
            <MainMenu/>
        </RightSide></Header></div>);
};
export default ApplicationHeader;