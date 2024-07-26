import React from "react";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.tsx";
import DummyPage from "../pages/DummyPage.tsx";

const CoreRouter: React.FC = () => {
  return <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/dummy" element={<DummyPage />} />
  </Routes>
}

export default CoreRouter;