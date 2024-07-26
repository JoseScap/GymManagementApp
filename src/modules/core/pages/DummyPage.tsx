import React from "react";
import {useNavigate} from "react-router-dom";

const DummyPage = () => {
  const navigate = useNavigate();

  return <>
    <h1>Dummy</h1>
    <div>
      <button onClick={() => navigate("/")}>Go to dashboard page</button>
    </div>
  </>;
}

export default DummyPage;