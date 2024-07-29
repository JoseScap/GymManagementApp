import {
  Autocomplete,
  Box, Button,
  Card,
  Divider,
  FormLabel,
  Grid,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import {useCreateSubscription} from "../hooks/useCreateSubscription.ts";
import {useEffect} from "react";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

const CreateSubscriptionPage: React.FC = () => {
  const {
    members,
    findAllMembers,
  } = useCreateSubscription()

  useEffect(() => {
    findAllMembers()
  }, []);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Subscripciones</Typography>,
          <Typography fontWeight="bold">Nueva suscripción</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Nueva suscripción</Typography>
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-lg" color="primary">Información de la suscripción</Typography>
        <Typography level="body-sm">Seleccioné el socio e ingrese la información de su nueva suscripción</Typography>
      </Box>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={10} display="flex" gap="8px" flexDirection="column">
          <FormLabel>Socio</FormLabel>
          <Autocomplete
            placeholder="Ingrese el DNI del socio. Ej: 40401501"
            options={members}
            getOptionLabel={option => `${option.dni} - ${option.fullName}`}
            getOptionKey={option => option.id}
          />
        </Grid>
        <Grid item xs={2} display="flex" gap="8px" flexDirection="column-reverse">
          <Button variant="outlined">Fijar</Button>
        </Grid>
      </Grid>
    </Card>
  </>
}

export default CreateSubscriptionPage