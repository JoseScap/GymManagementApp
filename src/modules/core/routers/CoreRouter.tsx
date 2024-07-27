import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import PageLayout from "../../common/layouts/PageLayout.tsx";

const CoreRouter: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </PageLayout>
    )
}

export default CoreRouter;