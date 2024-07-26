import React from "react";
import {useNavigate} from "react-router-dom";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return <>
    <h1>Dashboard</h1>
    <div>
      <button onClick={() => navigate("/dummy")}>Go to dummy page</button>
    </div>
  </>;
}

export default DashboardPage;