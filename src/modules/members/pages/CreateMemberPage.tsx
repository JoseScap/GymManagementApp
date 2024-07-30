import {
  Box,
  Button,
  Card, CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { useCreateMember } from "../hooks/createMemberHooks.ts";

const CreateMemberPage: React.FC = () => {

  /* Tengo que traerlo desde el hook y de ahí actualizo */

  const { changeDni, changeFullName, changePhoneNumber, handleCreateMember } = useCreateMember();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // How can i get  the last values of the inputs?

    handleCreateMember();
  }

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Nuevo socio</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Nuevo socio</Typography>
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-lg" color="primary">Información del nuevo socio</Typography>
        <Typography level="body-sm">Ingresa en el formulario la informacion del nuevo socio.</Typography>
      </Box>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>Apellido y nombre</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese el apellido y nombre del socio. Ej: Cristian Orellana."
                onChange={(e) => { changeFullName(e.target.value) }} required />
            </FormControl>
          </Grid>
          <Grid item xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>DNI</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese el DNI. Ej: 40123456"
                onChange={(e) => { changeDni(e.target.value) }} required />
            </FormControl>
          </Grid>
          <Grid item xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>Numero de telefono</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese un numero de contacto. Ej:3814556677" onChange={(e) => { changePhoneNumber(e.target.value) }} />
            </FormControl>
          </Grid>
        </Grid>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral">
              Cancelar
            </Button>
            <Button size="sm" variant="solid" type="submit">
              Guardar
            </Button>
          </CardActions>
        </CardOverflow>
      </form>
    </Card>
  </>
}

export default CreateMemberPage