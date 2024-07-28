import {Route, Routes} from "react-router-dom";
import CreateSubscriptionPage from "../pages/CreateSubscriptionPage.tsx";

const SubscriptionRouter: React.FC = () => {
  return <Routes>
    <Route path="/create" element={<CreateSubscriptionPage />} />
  </Routes>
}

export default SubscriptionRouter