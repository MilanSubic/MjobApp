import { Card } from "antd";
import React from "react";
import "../styles/SingUp.css";
import AdForm from "../components/AdForm";
export const CreatAdPage = () => {
  const initialData = null;
  return (
    <div className="container">
      <Card className="card" title="Kreiraj oglas">
        <AdForm initialData={initialData} editMode={true} />
      </Card>
    </div>
  );
};
