import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";

const CoreRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    )
}

export default CoreRouter;