import {Autocomplete, Box, Button, Card, Divider, FormLabel, Grid, Typography} from "@mui/joy";
import {Member} from "../../common/types/members";
import {useCreateSubscription} from "../hooks/useCreateSubscription.ts";

const SubscriptionMemberForm: React.FC = () => {
  const {
    creationStep,
    members,
    selectedMember,
    changeCreationStep,
    changeSelectedMember
  } = useCreateSubscription()

  return <Card>
    <Box sx={{ mb: 1 }}>
      <Typography level="title-lg" color="primary">Información del socio</Typography>
      <Typography level="body-sm">Seleccioné el socio a suscribir.</Typography>
    </Box>
    <Divider />
    <Grid container spacing={2}>
      <Grid item xs={4} display="flex" gap="8px" flexDirection="column">
        <FormLabel>DNI</FormLabel>
        <Autocomplete
          placeholder="Ingrese el DNI del socio. Ej: 40401501"
          options={members}
          getOptionLabel={option => option.dni}
          getOptionKey={option => option.id}
          value={selectedMember}
          onChange={
            (_, newValue) => changeSelectedMember(newValue as Member)
          }
          disabled={creationStep === 'Subscription'}
        />
      </Grid>
      <Grid item xs={4} display="flex" gap="8px" flexDirection="column">
        <FormLabel>Apellido y nombre</FormLabel>
        <Autocomplete
          placeholder="Ingrese el nombre del socio. Ej: Juan Perez."
          options={members}
          getOptionLabel={option => option.fullName}
          getOptionKey={option => option.id}
          value={selectedMember}
          onChange={
            (_, newValue) => changeSelectedMember(newValue as Member) && console.log(newValue)
          }
          disabled={creationStep === 'Subscription'}
        />
      </Grid>
      <Grid item xs={4} display="flex" gap="8px" flexDirection="column-reverse">
        <Button
          variant="outlined"
          onClick={() => changeCreationStep('Subscription')}
          disabled={!selectedMember || creationStep === 'Subscription'}
        >
          Fijar
        </Button>
      </Grid>
    </Grid>
  </Card>
}

export default SubscriptionMemberForm;