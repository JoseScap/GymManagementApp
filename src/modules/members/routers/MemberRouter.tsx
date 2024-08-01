import { Route, Routes } from "react-router-dom";
import CreateMemberPage from "../pages/CreateMemberPage.tsx";
import MemberListPage from "../pages/MemberListPage.tsx";
import { MemberListProvider } from "../contexts/MemberListContext.tsx";
import { CreateMemberProvider } from "../contexts/CreateMemberContext.tsx";
import EditMemberPage from "../pages/EditMemberPage.tsx";
import { EditMemberProvider } from "../contexts/EditMemberContext.tsx";

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
          <EditMemberProvider>
            <EditMemberPage />
          </EditMemberProvider>
        }
      />
    </Routes>
  )
}

export default MemberRouter;