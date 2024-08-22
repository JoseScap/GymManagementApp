import '@fontsource/inter'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppRouter } from "./routers/AppRouter";
import { AppRouterProvider } from './routers';
import { SocketProvider } from './socket/SocketContext';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SocketProvider>
        <AppRouterProvider>
          <AppRouter />
        </AppRouterProvider>
      </SocketProvider>
    </LocalizationProvider>
  )
}

export default App
