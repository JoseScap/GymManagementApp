import {Route, Routes} from "react-router-dom";
import CreateSubscriptionPage from "../pages/CreateSubscriptionPage.tsx";
import {CreateSubscriptionProvider} from "../contexts/CreateSubscriptionContext.tsx";

const SubscriptionRouter: React.FC = () => {
  return <Routes>
    <Route path="/create" element={
      <CreateSubscriptionProvider>
        <CreateSubscriptionPage />
      </CreateSubscriptionProvider>
    } />
  </Routes>
}

export default SubscriptionRouter