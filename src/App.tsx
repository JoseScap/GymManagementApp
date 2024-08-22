import '@fontsource/inter'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppRouter } from "./routers/AppRouter";
import { AppRouterProvider } from './routers';
import { SocketProvider } from './socket/SocketContext';
import { WatchmanProvider } from './watchman/WatchmanContext';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SocketProvider>
        <WatchmanProvider>
          <AppRouterProvider>
            <AppRouter />
          </AppRouterProvider>
        </WatchmanProvider>
      </SocketProvider>
    </LocalizationProvider>
  )
}

export default App
