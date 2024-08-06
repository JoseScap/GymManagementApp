import PageLayout from "../modules/common/layouts/PageLayout.tsx";
import HomePage from "../modules/core/pages/HomePage.tsx";
import WipPage from "../modules/core/pages/WipPage.tsx";
import MemberListPage from "../modules/members/pages/MemberListPage.tsx";
import CreateMemberPage from "../modules/members/pages/CreateMemberPage.tsx";
import { MemberListProvider } from "../modules/members/contexts/MemberListContext.tsx";
import { CreateMemberProvider } from "../modules/members/contexts/CreateMemberContext.tsx";
import MemberPage from "../modules/members/pages/MemberPage.tsx";
import { CreateSubscriptionProvider } from "../modules/subscriptions/contexts/CreateSubscriptionContext.tsx";
import CreateSubscriptionPage from "../modules/subscriptions/pages/CreateSubscriptionPage.tsx";
import { ListSubscriptionProvider } from "../modules/subscriptions/contexts/ListSubscriptionContext.tsx";
import ListSubscriptionPage from "../modules/subscriptions/pages/ListSubscriptionPage.tsx";
import { Route } from "./index.ts";
import SubscriptionPage from "../modules/subscriptions/pages/SubscriptionPage.tsx";

export const AppRouter: React.FC = () => {
  return <PageLayout>
    <Route page='Core:Home' element={<HomePage />} />
    <Route page='Core:Dashboard' element={<WipPage />} />
    <Route page='Core:Notification' element={<WipPage />} />
    <Route page='Member:List' element={<MemberListProvider><MemberListPage /></MemberListProvider>} />
    <Route page='Member:Create' element={<CreateMemberProvider><CreateMemberPage /></CreateMemberProvider>} />
    <Route page='Member:Detail' element={<MemberPage />} />
    <Route page='Subscription:Create' element={<CreateSubscriptionProvider><CreateSubscriptionPage /></CreateSubscriptionProvider>} />
    <Route page='Subscription:List' element={<ListSubscriptionProvider><ListSubscriptionPage /></ListSubscriptionProvider>} />
    <Route page='Subscription:Detail' element={<SubscriptionPage/>} />
  </PageLayout>
}