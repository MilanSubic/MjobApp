import { Table, Button, Card } from "antd";
import styled from "styled-components";

export const Content = styled.div`
  margin: 16px;
  flex-grow: 1;
`;
export const StyledButton = styled(Button)`
  background-color: blue;
  color: azure;
`;
export const StyledTable = styled(Table)`
  flex-grow: 1;
`;
export const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
export const CardDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
`;
export const StyledCard = styled(Card)`
  .custom-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-card {
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
  }
`;
