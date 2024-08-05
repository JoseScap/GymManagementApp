import { Route, Routes } from "react-router-dom";
import CreateSubscriptionPage from "../pages/CreateSubscriptionPage.tsx";
import { CreateSubscriptionProvider } from "../contexts/CreateSubscriptionContext.tsx";
import ListSubscriptionPage from "../pages/ListSubscriptionPage.tsx";
import { ListSubscriptionProvider } from "../contexts/ListSubscriptionContext.tsx";
import SubscriptionPage from "../pages/SubscriptionPage.tsx";

const SubscriptionRouter: React.FC = () => {
  return <Routes>
    <Route path="/create" element={
      <CreateSubscriptionProvider>
        <CreateSubscriptionPage />
      </CreateSubscriptionProvider>
    } />
    <Route path="/list" element={
      <ListSubscriptionProvider>
        <ListSubscriptionPage />
      </ListSubscriptionProvider>
    } />
    <Route
      path="/subscription/:id"
      element={
        <SubscriptionPage />
      }
    />
  </Routes>

}

export default SubscriptionRouter