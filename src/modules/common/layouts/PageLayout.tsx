import {PropsWithChildren} from "react";
import {
  Box
} from "@mui/joy";
import Sidebar from "../components/Sidebar.tsx";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return(
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: 6,
          pt: 3,
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
        bgcolor={"background.body"}
      >
        {children}
      </Box>
    </Box>
  )
}

export default PageLayout