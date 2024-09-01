import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  FormControl,
  Input,
  Typography
} from "@mui/joy";
import Sidebar from "../components/Sidebar.tsx";
import fondo2 from "../../../assets/fondo2.jpg";
import { PasswordOutlined } from "@mui/icons-material";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState<string>("");

  return (
    isLocked ? (
    <Box width='100vw' height='100vh' overflow='hidden'>
      <Box position='fixed' left={0} top={0} width='100%' height='100vh' overflow='hidden' zIndex={-100}>
        <AspectRatio ratio="16/9" minHeight="100vh" objectFit='cover'>
          <img src={fondo2} />
        </AspectRatio>
      </Box>
      <Box 
        position='absolute' 
        zIndex={100} 
        top={0} 
        left={0} 
        width="100%" 
        height="100%" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
      >
        <Card>
          <Typography style={{ fontWeight: 'bold' }} startDecorator={<PasswordOutlined />}>Ingrese el pin</Typography>
          <FormControl
            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
          >
            <Input
              size="md"
              placeholder="Ingrese el pin"
              style={{ fontWeight: 'bold' }}
              onChange={(e) => { setPin(e.target.value) }}
              value={pin}
              type="password"
              required
            />
            <Button
              onClick={() => { if (pin === "1020") {
                setIsLocked(false)
                setPin("")
              }}}
            >
              Abrir
            </Button>
          </FormControl>
        </Card>
      </Box>
    </Box>
    ) : (
    <Box sx={{ display: 'flex', minHeight: '100dvh', position: 'relative' }}>
      <Sidebar onLock={() => { setIsLocked(true) }} />
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
  )
}

export default PageLayout;