import {Box, Button, Card, Chip, DialogActions, DialogContent, DialogTitle, Divider, FormLabel, Grid, Modal, ModalDialog, Tab, TabList, TabPanel, Tabs, Typography} from "@mui/joy";
import { DollarSign } from "lucide-react";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs";
import { useEffect, useState } from "react";
import { TodaySummary, WeekSummary } from "../../common/types/responses";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AccountBalanceRounded, AttachMoneyOutlined, WarningRounded } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Summary } from "../../common/types/summary";
import { toast } from "react-toastify";
import LocalAtmRounded from "@mui/icons-material/LocalAtmRounded";

const HomePage: React.FC = () => {
  const [today, setToday] = useState<TodaySummary | null>(null)
  const [todayIsClosed, setTodayIsClosed] = useState<boolean>(false)
  const [calendarDay, setCalendarDay] = useState<Dayjs | null>(null)
  const [day, setDay] = useState<Summary | null>(null)
  const [calendarDayOfWeek, setCalendarDayOfWeek] = useState<Dayjs | null>(null)
  const [week, setWeek] = useState<WeekSummary | null>(null)
  const [calendarDayOfMonth, setCalendarDayOfMonth] = useState<Dayjs | null>(null)
  const [month, setMonth] = useState<WeekSummary | null>(null)
  const [signModal, setSignModal] = useState<boolean>(false)

  const findToday = async () => {
    try {
      const date = new Date()
      await axios.get(`http://localhost:3000/summaries/day?day=${date.toISOString()}`)
      setTodayIsClosed(true)
    } catch (error) {
      const customError = error as AxiosError<{ message: string, statusCode: number }>
      if (customError.response?.status === 404) {
        setTodayIsClosed(false)
      }
    }

    const response: AxiosResponse<TodaySummary> = await axios.get('http://localhost:3000/summaries')
    setToday(response.data)
  }

  const handleSignToday = async () => {
    setSignModal(false)
    try {
      await axios.post('http://localhost:3000/summaries')
      toast.success('El dia fue cerrado correctamente')
      findToday()
    } catch (error) {
      toast.success('Ocurrio un error, no se pudo cerrar el dia')
    }
  }

  const handleChangeCalendarDay = async (date: Dayjs | null) => {
    setCalendarDay(date)
    if (!date) {
      setDay(null)
      return
    }

    try {
      const response: AxiosResponse<Summary> = await axios.get(`http://localhost:3000/summaries/day?day=${date.toISOString()}`)
      setDay(response.data)
    } catch (error) {
      setDay(null)     
      const typifiedError = error as AxiosError
      if (typifiedError?.response?.status === 404) toast.success('Este día no cuenta con cierres')   
    }
  }

  const handleChangeCalendarDayOfWeek = async (date: Dayjs | null) => {
    setCalendarDayOfWeek(date)
    if (!date) {
      setWeek(null)
      return
    }

    try {
      const response: AxiosResponse<WeekSummary> = await axios.get(`http://localhost:3000/summaries/week?day=${date.toISOString()}`)
      setWeek(response.data)
    } catch (error) {
      setWeek(null)      
      const typifiedError = error as AxiosError
      if (typifiedError?.response?.status === 404) toast.success('Esta semana no cuenta con cierres')  
    }
  }

  const handleChangeCalendarDayOfmonth = async (date: Dayjs | null) => {
    setCalendarDayOfMonth(date)
    if (!date) {
      setMonth(null)
      return
    }

    try {
      const response: AxiosResponse<WeekSummary> = await axios.get(`http://localhost:3000/summaries/month?day=${date.toISOString()}`)
      setMonth(response.data)
    } catch (error) {
      setMonth(null) 
      const typifiedError = error as AxiosError
      if (typifiedError?.response?.status === 404) toast.success('Este mes no cuenta con cierres')  
    }
  }

  useEffect(() => {
    findToday()
  }, [])

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <DollarSign color="white"/>,
          <Typography fontWeight="bold" style={{ color: 'white' }}>Caja</Typography>
        ]}
      />
    </Box>
    <Typography level="h2" style={{ color: 'white' }}>Resumenes de caja</Typography>
    <Tabs>
      <TabList>
        <Tab style={{ fontWeight: 'bold' }}>Día de hoy</Tab>
        <Tab style={{ fontWeight: 'bold' }}>Por día</Tab>
        <Tab style={{ fontWeight: 'bold' }}>Por semana</Tab>
        <Tab style={{ fontWeight: 'bold' }}>Por mes</Tab>
      </TabList>
      <TabPanel value={0}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>
                Ingresos del día {todayIsClosed && <Chip color="danger" style={{ fontWeight: 'bold' }}>DÍA CERRADO</Chip>}
              </Typography>
              <Button color="success" onClick={() => setSignModal(true)} disabled={todayIsClosed}>Cerrar día</Button>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{today?.newMembersCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{today?.renewedMembersCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{today?.gymClassesCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{today?.newMembersCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{today?.newMembersTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.newMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{today?.renewedMembersCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{today?.renewedMembersTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.renewedMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{today?.gymClassesCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{today?.gymClassesTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.gymClassesIncome ?? 0}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Typography level="h3" color="danger" startDecorator={<AttachMoneyOutlined />}>Cancelaciones del día</Typography>
          </Grid>
          <Grid xs={12}>
            <Card color="danger">
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{today?.newMembersCanceledCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{today?.renewedMembersCanceledCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{today?.gymClassesCanceledCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{today?.newMembersCanceledCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{today?.newMembersCanceledTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.newMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{today?.renewedMembersCanceledCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{today?.renewedMembersCanceledTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.renewedMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{today?.gymClassesCanceledCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{today?.gymClassesCanceledTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.gymClassesCanceledIncome ?? 0}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>Total efectivo</Typography>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>{today?.totalCashIncome ?? 0}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>Total transferencía</Typography>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>{today?.totalTransferIncome ?? 0}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" startDecorator={<AttachMoneyOutlined />}>Total del día</Typography>
              <Typography level="h3" startDecorator={<AttachMoneyOutlined />}>{today?.totalIncome ?? 0}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={1}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>
                Ingresos del día
                {day?.isModified && <Chip color="danger" style={{ fontWeight: 'bold' }}>DÍA MODIFICADO</Chip>}
              </Typography>
              <Box>
                <FormLabel>Seleccione un día</FormLabel>
                <DatePicker
                  value={calendarDay}
                  onChange={handleChangeCalendarDay}
                  format="DD/MM/YYYY"
                  disableFuture
                />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{day?.newMembersCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{day?.renewedMembersCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{day?.gymClassesCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{day?.newMembersCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{day?.newMembersTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{day?.newMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{day?.renewedMembersCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{day?.renewedMembersTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{day?.renewedMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{day?.gymClassesCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{day?.gymClassesTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{day?.gymClassesIncome ?? 0}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Typography level="h3" color="danger" startDecorator={<AttachMoneyOutlined />}>Cancelaciones del día</Typography>
          </Grid>
          <Grid xs={12}>
            <Card color="danger">
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros cancelados</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{day?.newMembersCanceledCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{day?.renewedMembersCanceledCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{day?.gymClassesCanceledCount ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{day?.newMembersCanceledCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{day?.newMembersCanceledTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{day?.newMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{day?.renewedMembersCanceledCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{day?.renewedMembersCanceledTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{day?.renewedMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{day?.gymClassesCanceledCashIncome ?? 0}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{day?.gymClassesCanceledTransferIncome ?? 0}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{day?.gymClassesCanceledIncome ?? 0}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>Total efectivo</Typography>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>{day?.totalCashIncome ?? 0}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>Total transferencía</Typography>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>{day?.totalTransferIncome ?? 0}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" startDecorator={<AttachMoneyOutlined />}>Total del día</Typography>
              <Typography level="h3" startDecorator={<AttachMoneyOutlined />}>{day?.totalIncome ?? 0}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={2}>
      <Grid container spacing={2}>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>
                Ingresos de la semana
              </Typography>
              <Box>
                <FormLabel>Seleccion un día de la semana</FormLabel>
                <DatePicker
                  value={calendarDayOfWeek}
                  onChange={handleChangeCalendarDayOfWeek}
                  format="DD/MM/YYYY"
                  disableFuture
                />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{week?.newMembersCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{week?.renewedMembersCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{week?.gymClassesCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{week?.newMembersCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{week?.newMembersTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{week?.newMembersIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{week?.renewedMembersCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{week?.renewedMembersTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{week?.renewedMembersIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{week?.gymClassesCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{week?.gymClassesTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{week?.gymClassesIncome ?? "0.00"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Typography level="h3" color="danger" startDecorator={<AttachMoneyOutlined />}>Cancelaciones del día</Typography>
          </Grid>
          <Grid xs={12}>
            <Card color="danger">
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros cancelados</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{week?.newMembersCanceledCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{week?.renewedMembersCanceledCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{week?.gymClassesCanceledCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{week?.newMembersCanceledCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{week?.newMembersCanceledTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{week?.newMembersCanceledIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{week?.renewedMembersCanceledCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{week?.renewedMembersCanceledTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{week?.renewedMembersCanceledIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{week?.gymClassesCanceledCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{week?.gymClassesCanceledTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{week?.gymClassesCanceledIncome ?? "0.00"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>Total efectivo</Typography>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>{week?.totalCashIncome ?? "0.00"}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>Total transferencía</Typography>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>{week?.totalTransferIncome ?? "0.00"}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" startDecorator={<DollarSign />}>Total de la semana</Typography>
              <Typography level="h3" startDecorator={<DollarSign />}>{week?.totalIncome ?? "0.00"}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={3}>
      <Grid container spacing={2}>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>
                Ingresos del mes
              </Typography>
              <Box>
                <FormLabel>Seleccion un día del mes</FormLabel>
                <DatePicker
                  value={calendarDayOfWeek}
                  onChange={handleChangeCalendarDayOfmonth}
                  format="DD/MM/YYYY"
                  disableFuture
                />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{month?.newMembersCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{month?.renewedMembersCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{month?.gymClassesCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{month?.newMembersCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{month?.newMembersTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{month?.newMembersIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{month?.renewedMembersCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{month?.renewedMembersTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{month?.renewedMembersIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{month?.gymClassesCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{month?.gymClassesTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{month?.gymClassesIncome ?? "0.00"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Typography level="h3" color="danger" startDecorator={<AttachMoneyOutlined />}>Cancelaciones del día</Typography>
          </Grid>
          <Grid xs={12}>
            <Card color="danger">
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros cancelados</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{month?.newMembersCanceledCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Miembros viejos</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{month?.renewedMembersCanceledCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Clases</Typography>
                  <Typography level="body-lg" fontWeight='bold'>{month?.gymClassesCanceledCount ?? "0"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{month?.newMembersCanceledCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{month?.newMembersCanceledTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{month?.newMembersCanceledIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{month?.renewedMembersCanceledCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{month?.renewedMembersCanceledTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{month?.renewedMembersCanceledIncome ?? "0.00"}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography color="success" level="body-lg" fontWeight='bold' startDecorator={<LocalAtmRounded />}>{month?.gymClassesCanceledCashIncome ?? "0.00"}</Typography>
                  <Typography color='warning' level="body-lg" fontWeight='bold' startDecorator={<AccountBalanceRounded />}>{month?.gymClassesCanceledTransferIncome ?? "0.00"}</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{month?.gymClassesCanceledIncome ?? "0.00"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>Total efectivo</Typography>
              <Typography level="h3" color="success" startDecorator={<LocalAtmRounded />}>{month?.totalCashIncome ?? "0.00"}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>Total transferencía</Typography>
              <Typography level="h3" color="warning" startDecorator={<AccountBalanceRounded />}>{month?.totalTransferIncome ?? "0.00"}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" startDecorator={<DollarSign />}>Total de la semana</Typography>
              <Typography level="h3" startDecorator={<DollarSign />}>{month?.totalIncome ?? "0.00"}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </Tabs>
    <Modal
      open={signModal}
      // onClose={() => changeIdToDelete("")}
    >
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRounded />
          Atención
        </DialogTitle>
        <Divider />
        <DialogContent>
          ¿Estás seguro que quieres cerrar el dia?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="success" onClick={handleSignToday}>
            Cerrar dia
          </Button>
          <Button variant="plain" color="neutral" onClick={() => setSignModal(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  </>
}

export default HomePage;