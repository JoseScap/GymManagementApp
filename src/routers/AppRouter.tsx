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
import { useAppRouterContext } from "./useRouterHooks.ts";

export const AppRouter: React.FC = () => {
  const { page } = useAppRouterContext()

  return <PageLayout>
    {page === 'Core:Home' && <HomePage />}
    {page === 'Core:Dashboard' && <WipPage />}
    {page === 'Core:Notification' && <WipPage />}
    {page === 'Member:List' && <MemberListProvider><MemberListPage /></MemberListProvider>}
    {page === 'Member:Create' && <CreateMemberProvider><CreateMemberPage /></CreateMemberProvider>}
    {page === 'Member:Detail' && <MemberPage />}
    {page === 'Subscription:Create' && <CreateSubscriptionProvider><CreateSubscriptionPage /></CreateSubscriptionProvider>}
    {page === 'Subscription:List' && <ListSubscriptionProvider><ListSubscriptionPage /></ListSubscriptionProvider>}
  </PageLayout>
}