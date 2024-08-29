import { Box, Card, Chip, Grid, Typography } from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import { CalendarMonthRounded, GroupRounded, PersonRounded } from "@mui/icons-material";
import { useWatchman } from "../../../watchman/WatchmanContext.tsx";
import { useEffect } from "react";

const MiSocioPage: React.FC = () => {
  const { identifiedMember } = useWatchman()
  
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
    <Card>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Box sx={{ mb: 1 }}>
            <Typography level="h1" color="primary">¡Hola de nuevo!</Typography>
            <Typography level="h2" fontWeight="normal">Te saluda Orellana GYM. Este es el estado de tu ultima suscripción.</Typography>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Card>
            <Grid container spacing={2}>
              <Grid xs={3} display="flex" gap="8px" flexDirection="column">
                <Typography level="h4">Socio numero</Typography>
                <Chip
                  variant="soft"
                  size="lg"
                  startDecorator={<PersonRounded />}
                  color="success"
                  style={{ fontWeight: 'bold' }}
                >
                  {identifiedMember?.fingerprint?.id}
                </Chip>
              </Grid>
              <Grid xs={3} display="flex" gap="8px" flexDirection="column">
                <Typography level="h4">Nombre</Typography>
                <Chip
                  variant="soft"
                  size="lg"
                  startDecorator={<PersonRounded />}
                  color="success"
                  style={{ fontWeight: 'bold' }}
                >
                  {identifiedMember?.fullName}
                </Chip>
              </Grid>
              <Grid xs={3} display="flex" gap="8px" flexDirection="column">
                <Typography level="h4">Fecha de inicio</Typography>
                <Chip
                  variant="soft"
                  size="lg"
                  startDecorator={<CalendarMonthRounded />}
                  color="neutral"
                  style={{ fontWeight: 'bold' }}
                >
                  {
                    // dayjs(identifiedMember.subscriptions[0].dateFrom).format("DD/MM/YYYY")
                  }
                </Chip>
              </Grid>
              <Grid xs={3} display="flex" gap="8px" flexDirection="column">
                <Typography level="h4">Fecha de fin</Typography>
                <Chip
                  variant="soft"
                  size="lg"
                  startDecorator={<CalendarMonthRounded />}
                  color="neutral"
                  style={{ fontWeight: 'bold' }}
                >
                  {
                    // dayjs(identifiedMember.subscriptions[0].dateTo).format("DD/MM/YYYY")
                  }
                </Chip>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Card>
  </>
}

export default MiSocioPage;