import '@fontsource/inter'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppRouter, AppRouterProvider } from "./routers/AppRouter";

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
