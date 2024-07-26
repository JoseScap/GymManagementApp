import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/joy";

const DummyPage = () => {
  const navigate = useNavigate();

  return <>
    <Typography level="h2">Dummy</Typography>
    <div>
      <Button onClick={() => navigate("/")}>Go to dashboard page</Button>
    </div>
  </>;
}

export default DummyPage;