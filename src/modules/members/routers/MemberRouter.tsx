import { Route, Routes } from "react-router-dom";
import CreateMemberPage from "../pages/CreateMemberPage.tsx";
import MemberListPage from "../pages/MemberListPage.tsx";
import { MemberListProvider } from "../contexts/MemberListContext.tsx";
import { CreateMemberProvider } from "../contexts/CreateMemberContext.tsx";
import MemberPage from "../pages/MemberPage.tsx";

const MemberRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/create" element={
        <CreateMemberProvider>
          <CreateMemberPage />
        </CreateMemberProvider>
      } />
      <Route  
        path="/list"
        element={
          <MemberListProvider>
            <MemberListPage />
          </MemberListProvider>
        }
      />
      <Route
        path="/edit/:id"
        element={
            <MemberPage />
        }
      />
    </Routes>
  )
}

export default MemberRouter;