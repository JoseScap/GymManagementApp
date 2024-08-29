import '@fontsource/inter'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppRouter } from "./routers/AppRouter";
import { AppRouterProvider } from './routers';
import { SocketProvider } from './socket/SocketContext';
import { WatchmanProvider } from './watchman/WatchmanContext';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SocketProvider>
        <WatchmanProvider>
          <AppRouterProvider>
            <AppRouter />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </AppRouterProvider>
        </WatchmanProvider>
      </SocketProvider>
    </LocalizationProvider>
  )
}

export default App
