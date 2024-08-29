import { PropsWithChildren } from "react";
import {
  AspectRatio,
  Box
} from "@mui/joy";
import Sidebar from "../components/Sidebar.tsx";
import fondo2 from "../../../assets/fondo2.jpg";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', position: 'relative' }}>
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
          position: 'relative',
          zIndex: 1,
        }}
        bgcolor={"background.body"}
      >
        <Box position='fixed' left={0} top={0} width='100%' height='100vh' overflow='hidden' zIndex={-100}>
          <AspectRatio ratio="16/9" minHeight="100vh" objectFit='cover'>
            <img src={fondo2} />
          </AspectRatio>
        </Box>
        <Box position='fixed' left={0} top={0} width='100%' height='100vh' overflow='hidden' zIndex={-99} bgcolor='black' style={{ opacity: .5 }}></Box>
        {children}
      </Box>
    </Box>
  )
}

export default PageLayout;