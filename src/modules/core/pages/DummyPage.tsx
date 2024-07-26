import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/joy";
import PageLayout from "../../common/layouts/PageLayout.tsx";

const DummyPage = () => {
  const navigate = useNavigate();

  return <PageLayout>
    <Typography level="h2">Dummy</Typography>
  </PageLayout>;
}

export default DummyPage;