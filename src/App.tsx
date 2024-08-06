import '@fontsource/inter'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppRouter } from "./routers/AppRouter";
import { AppRouterProvider } from './routers';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRouterProvider>
        <AppRouter />
      </AppRouterProvider>
    </LocalizationProvider>
  )
}

export default App
