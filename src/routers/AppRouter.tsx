import PageLayout from "../modules/common/layouts/PageLayout.tsx";
import HomePage from "../modules/core/pages/HomePage.tsx";
import WipPage from "../modules/core/pages/WipPage.tsx";
import MemberPage from "../modules/members/pages/MemberPage.tsx";
import { CreateSubscriptionProvider } from "../modules/subscriptions/contexts/CreateSubscriptionContext.tsx";
import CreateSubscriptionPage from "../modules/subscriptions/pages/CreateSubscriptionPage.tsx";
import { ListSubscriptionProvider } from "../modules/subscriptions/contexts/ListSubscriptionContext.tsx";
import ListSubscriptionPage from "../modules/subscriptions/pages/ListSubscriptionPage.tsx";
import { Route } from "./index.ts";
import MiSocioPage from "../modules/core/pages/MiSocioPage.tsx";
import ClassListPage from "../modules/classes/pages/ClassListPage.tsx";
import { ClassListProvider } from "../modules/classes/contexts/ClassContext.tsx";

export const AppRouter: React.FC = () => {
  return <PageLayout>
    <Route page='Core:Home' element={<HomePage />} />
    <Route page='Core:Dashboard' element={<WipPage />} />
    <Route page='Core:Notification' element={<WipPage />} />
    <Route page='Member:Detail' element={<MemberPage />} />
    <Route page='Subscription:Create' element={<CreateSubscriptionProvider><CreateSubscriptionPage /></CreateSubscriptionProvider>} />
    <Route page='Subscription:List' element={<ListSubscriptionProvider><ListSubscriptionPage /></ListSubscriptionProvider>} />
    <Route page='Core:MiSocio' element={<MiSocioPage />} />
    <Route page='Class:List' element={<ClassListProvider><ClassListPage /></ClassListProvider>} />
  </PageLayout>
}