import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './socket/SocketContext';
import { useWatchman, WatchmanProvider } from './watchman/WatchmanContext';
import { Alert, Avatar, Box, Button, Card, Divider, Grid, Typography } from '@mui/joy';
import AppBreadcrumbs from './modules/common/components/AppBreadcrumbs';
import { CalendarMonthOutlined, Check, Close, GroupRounded, PersonOutline, ScreenShare, TimerOutlined, WarningOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';

const WatchmanApp = () => {
  const { identifiedMember, daysDifference } = useWatchman()
  
  const handleSwitchScreens = () => {
    window.electron.ipcRenderer.send('switch-screens');
  };

  return <Box paddingX={8} paddingY={4}>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRounded />,
          <Typography fontWeight="bold">Mi Socio</Typography>
        ]}
      />
    </Box>
    <Box display='flex' flexDirection="row" justifyContent='space-between' alignItems='center'>
      <Typography level="h1">Mi Socio</Typography>
      <Button
        size='sm'
        startDecorator={<ScreenShare />}
        onClick={handleSwitchScreens}  
      >
        Cambiar pantallas
      </Button>
    </Box>
    {
      daysDifference != null && daysDifference <= 0 && (
        <Grid container rowSpacing={0} marginBottom={2}>
          <Grid xs={6} xsOffset={3}>
            <Alert
              size='lg'
              color='danger'
              startDecorator={<WarningOutlined />}
            >
              Tu suscripción vencio el dia {dayjs(identifiedMember!.subscriptions![0].dateTo).format('DD/MM/YYYY')}
            </Alert>
          </Grid>
        </Grid> 
      )
    }
    {
      daysDifference != null && daysDifference > 0 && daysDifference <= 3 && (
        <Grid container rowSpacing={0} marginBottom={2}>
          <Grid xs={6} xsOffset={3}>
            <Alert
              size='lg'
              color='warning'
              startDecorator={<WarningOutlined />}
            >
              Tu suscripción vence en {daysDifference} {daysDifference > 1 ? 'días' : 'día'}
            </Alert>
          </Grid>
        </Grid> 
      )
    }
    <Grid container spacing={2}>
      <Grid xs={6} xsOffset={3}>
        <Card
          variant='soft'
          color='success'
          sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}
        >
          <Box display='flex' flexDirection='row'>
            {
              daysDifference != null && daysDifference > 0 && (
                <Check style={{ fontSize: '72px' }} />
              )
            }
            {
              daysDifference != null && daysDifference <= 0 && (
                <Close color='error' style={{ fontSize: '72px' }} />
              )
            }
            <Box>
              <Typography color='success' level='h2'>Bienvenido de nuevo</Typography>
              <Typography level='h3'>
                {
                  !!identifiedMember
                    ? identifiedMember.fullName
                    : 'N/A'
                }
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box display='flex' flexDirection='column'>
            <Box display='flex' columnGap={2}>
              <Avatar color='success' size='lg'>
                <PersonOutline />
              </Avatar>
              <Box display='flex' flexDirection='column'>
                <Typography level='h4'>Numero de socío</Typography>
                <Typography>
                  {
                    !!identifiedMember?.fingerprint
                      ? identifiedMember.fingerprint.id
                      : 'N/A'
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' columnGap={2}>
              <Avatar color='primary' size='lg'>
                <CalendarMonthOutlined />
              </Avatar>
              <Box display='flex' flexDirection='column'>
                <Typography level='h4'>Inicio de suscripción</Typography>
                <Typography>
                  {
                    !!identifiedMember?.subscriptions
                      ? dayjs(identifiedMember.subscriptions[0].dateFrom).format('DD/MM/YYYY')
                      : 'N/A'
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' columnGap={2}>
              <Avatar color='danger' size='lg'>
                <TimerOutlined />
              </Avatar>
              <Box display='flex' flexDirection='column'>
                <Typography level='h4'>Fin de suscripción</Typography>
                <Typography>
                  {
                    !!identifiedMember?.subscriptions
                      ? dayjs(identifiedMember.subscriptions[0].dateTo).format('DD/MM/YYYY')
                      : 'N/A'
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </Box>
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SocketProvider>
        <WatchmanProvider>
          <WatchmanApp />
        </WatchmanProvider>
      </SocketProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
