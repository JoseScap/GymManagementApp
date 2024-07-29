import {Typography} from "@mui/joy";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const HomePage: React.FC = () => {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Typography level="h2">Inicio</Typography>
    <DateCalendar />
  </LocalizationProvider>
}

export default HomePage;