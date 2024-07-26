import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/joy";
import PageLayout from "../../common/layouts/PageLayout.tsx";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return <PageLayout>
    <Typography level="h2">Dashboard</Typography>
  </PageLayout>;
}

export default DashboardPage;