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
  Stack,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../core/components/AppBreadcrumbs.tsx";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import Sheet from "@mui/joy/Sheet";

const CreateMemberPage: React.FC = () => {
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
      <Grid container spacing={2}>
        <Grid item xs={6} display="flex" gap="8px" flexDirection="column">
          <FormLabel>Apellido y nombre</FormLabel>
          <FormControl
            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
          >
            <Input size="sm" placeholder="Ingrese el apellido y nombre del socio. Ej: Cristian Orellana." />
          </FormControl>
        </Grid>
        <Grid item xs={6} display="flex" gap="8px" flexDirection="column">
          <FormLabel>DNI</FormLabel>
          <FormControl
            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
          >
            <Input size="sm" placeholder="Ingrese el DNI. Ej: 40123456" />
          </FormControl>
        </Grid>
        <Grid item xs={6} display="flex" gap="8px" flexDirection="column">
          <FormLabel>Numero de telefono</FormLabel>
          <FormControl
            sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
          >
            <Input size="sm" placeholder="Ingrese un numero de contacto. Ej:3814556677" />
          </FormControl>
        </Grid>
      </Grid>
      <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
          <Button size="sm" variant="outlined" color="neutral">
            Cancel
          </Button>
          <Button size="sm" variant="solid">
            Save
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  </>
}

export default CreateMemberPage