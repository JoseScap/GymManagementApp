import { Alert, Avatar, Box, Card, Divider, Grid, Typography } from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import { CalendarMonthOutlined, Check, Close, GroupRounded, TimerOutlined, WarningOutlined } from "@mui/icons-material";
import { useWatchman } from "../../../watchman/WatchmanContext.tsx";
import { useEffect } from "react";
import dayjs from "dayjs";

const MiSocioPage: React.FC = () => {
  const { identifiedMember, daysDifference, unknownMember } = useWatchman()
  
  useEffect(() => {
    console.log(identifiedMember)
  }, [identifiedMember])

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRounded />,
          <Typography fontWeight="bold">Mi Socio</Typography>
        ]}
      />
    </Box>
    <Typography level="h1" sx={{ color: "white" }}>Mi Socio</Typography>
    {daysDifference != null && daysDifference <= 0 && (
      <Grid container rowSpacing={0} marginBottom={2}>
        <Grid xs={8} xsOffset={2}>
          <Alert
            size='lg'
            color='danger'
            startDecorator={<WarningOutlined />}
            style={{ fontSize: '25px' }}
          >
            El socio no se encuentra activo, su suscripcion vencío el día {dayjs(identifiedMember!.subscriptions![0].dateTo).format('DD/MM/YYYY')}
          </Alert>
        </Grid>
      </Grid> 
    )}

    {unknownMember && (
      <Grid container rowSpacing={0} marginBottom={2}>
        <Grid xs={8} xsOffset={2}>
          <Alert
            size='lg'
            color='danger'
            startDecorator={<WarningOutlined />}
            style={{ fontSize: '25px' }}
          >
            No se identifico el miembro.
          </Alert>
        </Grid>
      </Grid> 
    )}

    {identifiedMember !== null && (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <Card
          variant='soft'
          sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}
        >
          <Box display='flex' flexDirection='row'>
            {
              daysDifference != null && daysDifference > 0 && (
                <Check style={{ fontSize: '100px' }} color='success' />
              )
            }
            {
              daysDifference != null && daysDifference <= 0 && (
                <Close color='error' style={{ fontSize: '100px' }} />
              )
            }
            <Box>
              <Typography color='success' level='h1'>Bienvenido de nuevo</Typography>
              <Typography level='h2'>
                {
                  `${identifiedMember?.fingerprint?.id ?? 0} - ${identifiedMember?.fullName ?? "N/A"}`
                }
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box display='flex' flexDirection='column'>
            <Box display='flex' columnGap={2}>
              <Avatar color='primary' size='lg'>
                <CalendarMonthOutlined />
              </Avatar>
              <Box display='flex' flexDirection='column'>
                <Typography level='h2' fontWeight='bold'>Inicio de suscripción</Typography>
                <Typography level='h2' fontWeight='bold'>
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
                <Typography level='h2' fontWeight='bold'>Fin de suscripción</Typography>
                <Typography level='h2' fontWeight='bold'>
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
    )}
  </>
}

export default MiSocioPage;