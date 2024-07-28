import {Route, Routes} from "react-router-dom";
import CreateMemberPage from "../pages/CreateMemberPage.tsx";
import MemberListPage from "../pages/MemberListPage.tsx";
import {MemberListProvider} from "../contexts/MemberListContext.tsx";

const MemberRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/create" element={<CreateMemberPage />} />
      <Route
        path="/list"
        element={
          <MemberListProvider>
            <MemberListPage />
          </MemberListProvider>
        }
      />
    </Routes>
  )
}

export default MemberRouter;