import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/joy";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return <>
    <Typography level="h2">Dashboard</Typography>
    <div>
      <Button onClick={() => navigate("/dummy")}>Go to dummy page</Button>
    </div>
  </>;
}

export default DashboardPage;