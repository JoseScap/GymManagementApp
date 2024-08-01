import {BrowserRouter} from "react-router-dom";
import '@fontsource/inter'
import AppRouter from "./routers/AppRouter.tsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
