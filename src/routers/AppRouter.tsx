import {Route, Routes} from "react-router-dom";
import CoreRouter from "../modules/core/routers/CoreRouter.tsx";

const AppRouter: React.FC = () => {
  return <Routes>
    <Route path="/*" element={<CoreRouter />} />
  </Routes>
}

export default AppRouter;