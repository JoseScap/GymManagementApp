import {Route, Routes} from "react-router-dom";
import CreateMemberPage from "../pages/CreateMemberPage.tsx";
import MemberListPage from "../pages/MemberListPage.tsx";

const MemberRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/create" element={<CreateMemberPage />} />
      <Route path="/list" element={<MemberListPage />} />
    </Routes>
  )
}

export default MemberRouter;