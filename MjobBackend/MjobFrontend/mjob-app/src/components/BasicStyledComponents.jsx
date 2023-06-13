import {Table, Button, Card, DatePicker} from "antd";
import styled from "styled-components";
import {Header} from "antd/es/layout/layout";

export const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const Toolbar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  margin: 16px;
  flex-grow: 1;
`;

export const StyledTable = styled(Table)`
  flex-grow: 1;
`;

export const StyledButton = styled(Button)`
  background-color: blue;
  color: azure;
`;

export const StyledCard = styled(Card)`
    padding: 16px;
    width: 300.0px;
    height: auto;
    border-color: blue;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
  
    margin: 5px;
    margin-left: 5px;
  
  .ant-card-head-title {
    font-size: 20px;
    color: blue;
  }

  .ant-card-meta-title {
    /* Add your custom styles here */
    color: blue;
    font-size: 1.5rem;
    font-weight: bold;
    /* Add any other desired styles */
  }
`;

export const StyledHeader = styled(Header)`
  color: blue;
  background-color: white;
  font-size: 40px;
  padding-bottom: 25px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 20px;
`;

export const StyledContent = styled(Content)`
  color: blue;
  font-weight: bold;
`;
