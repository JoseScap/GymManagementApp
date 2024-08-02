import {Route, Routes} from "react-router-dom";
import CoreRouter from "../modules/core/routers/CoreRouter.tsx";
import MemberRouter from "../modules/members/routers/MemberRouter.tsx";
import PageLayout from "../modules/common/layouts/PageLayout.tsx";
import SubscriptionRouter from "../modules/subscriptions/routers/SubscriptionRouter.tsx";

const AppRouter: React.FC = () => {
  return <PageLayout>
    <Routes>
      <Route path="/*" element={<CoreRouter />} />
      <Route path="/members/*" element={<MemberRouter />} />
      <Route path="/subscriptions/*" element={<SubscriptionRouter />} />
    </Routes>
  </PageLayout>
}

export default AppRouter;