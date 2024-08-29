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
import { useCreateMember } from "../hooks/useCreateMemberHooks.ts";
import { PersonOutlineRounded } from "@mui/icons-material";

const CreateMemberPage: React.FC = () => {
  const { member, changeDni, changeFullName, changePhoneNumber, createMember } = useCreateMember();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createMember().finally(() => {
      changeFullName("");
      changeDni("");
      changePhoneNumber("");
    })
  }

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Socios</Typography>,
          <Typography fontWeight="bold">Nuevo socio</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Nuevo socio</Typography>
    <form onSubmit={handleSubmit}>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-lg" color="primary">Información del nuevo socio</Typography>
          <Typography level="body-sm">Ingresa en el formulario la informacion del nuevo socio.</Typography>
        </Box>
        <Divider />
        <Grid container spacing={2}>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <Typography startDecorator={<PersonOutlineRounded />}>Apellido y nombre</Typography>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input
                size="sm"
                placeholder="Ingrese el apellido y nombre del socio. Ej: Cristian Orellana."
                onChange={(e) => { changeFullName(e.target.value) }} value={member.fullName}
                required
              />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>DNI</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese el DNI. Ej: 40123456"
                onChange={(e) => { changeDni(e.target.value) }} value={member.dni} required />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>Numero de telefono</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese un numero de contacto. Ej:3814556677"
                onChange={(e) => { changePhoneNumber(e.target.value) }} value={member.phoneNumber} />
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
      </Card>
    </form>
  </>
}

export default CreateMemberPage