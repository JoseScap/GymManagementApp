import {Box, Button, Card, Divider, FormLabel, Grid, Tab, TabList, TabPanel, Tabs, Typography} from "@mui/joy";
import { DollarSign } from "lucide-react";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs";
import { useEffect, useState } from "react";
import { TodaySummary } from "../../common/types/responses";
import axios, { AxiosResponse } from "axios";
import { AttachMoneyOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Summary } from "../../common/types/summary";

const HomePage: React.FC = () => {
  const [today, setToday] = useState<TodaySummary | null>(null)
  const [calendarDay, setCalendarDay] = useState<Dayjs | null>(null)
  const [day, setDay] = useState<Summary | null>(null)

  const findToday = async () => {
    const response: AxiosResponse<TodaySummary> = await axios.get('http://localhost:3000/summaries')
    setToday(response.data)
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
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>Ingresos del día</Typography>
              <Button color="success">Cerrar día</Button>
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
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.newMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.renewedMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
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
                  <Typography level="body-lg" fontWeight='bold'>Nuevos miembros cancelados</Typography>
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
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.newMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<AttachMoneyOutlined />}>{today?.renewedMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
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
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>Total del día</Typography>
              <Typography level="h3" color="success" startDecorator={<AttachMoneyOutlined />}>{today?.totalIncome ?? 0}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={1}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<DollarSign />}>Ingresos del día</Typography>
              <Box display='flex'>
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
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<DollarSign />}>{day?.newMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<DollarSign />}>{day?.renewedMembersIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<DollarSign />}>{day?.gymClassesIncome ?? 0}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Typography level="h3" color="danger" startDecorator={<DollarSign />}>Cancelaciones del día</Typography>
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
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<DollarSign />}>{day?.newMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<DollarSign />}>{day?.renewedMembersCanceledIncome ?? 0}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography level="body-lg" fontWeight='bold'>Total</Typography>
                  <Typography level="body-lg" fontWeight='bold' startDecorator={<DollarSign />}>{day?.gymClassesCanceledIncome ?? 0}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Box display='flex' justifyContent='space-between'>
              <Typography level="h3" color="success" startDecorator={<DollarSign />}>Total del día</Typography>
              <Typography level="h3" color="success" startDecorator={<DollarSign />}>{day?.totalIncome ?? 0}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    </Tabs>
  </>
}

export default HomePage;