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
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useEditMember } from "../hooks/useEditMemberHooks.ts";
import { useMemo, useState } from "react";

const EditMemberPage: React.FC = () => {

  // const { memberId, memberLast, member } = usecont();

  const { member, updateMemberId, getMemberById, getMemberBeforeEdit, changeFullName, changeDni, changePhoneNumber, editMember } = useEditMember();

  const [edit, setEdit] = useState(false);

  const navigate: NavigateFunction = useNavigate();
  const memberId = useParams().id; /* pregunta que onda el type */

  useMemo(() => {
    updateMemberId(Number(memberId));
    getMemberById(Number(memberId));
  }, [memberId])

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    editMember().finally(() => {
        changeFullName("");
        changeDni("");
        changePhoneNumber("");
        navigate("../list");
    })
  }

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Socio: {member.fullName}</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Perfil del Socio</Typography>
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-lg" color="primary">Información del socio {`${member.fullName}`}</Typography>
        <Typography level="body-sm">Clickea el botón para editar la información del socio</Typography>
        <Typography level="body-sm">Puedes también restablecer los datos del socio.</Typography>
      </Box>
      <Button size="sm" variant="solid" type="submit" onClick={() => { setEdit(prev => !prev) }}>
        Editar
      </Button>
      <Button size="sm" variant="solid" type="submit" onClick={() => { getMemberBeforeEdit() }}>
        {/* Preguntar si josé quiere el disabled={edit} aquí */}
        Volver a los valores anteriores
      </Button>
      <Divider />
      <form onSubmit={handleEdit}>
        <Grid container spacing={2}>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>Apellido y nombre</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese el apellido y nombre del socio. Ej: Cristian Orellana."
                onChange={(e) => { changeFullName(e.target.value) }} value={member.fullName}
                disabled={!edit}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>DNI</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese el DNI. Ej: 40123456"
                onChange={(e) => { changeDni(e.target.value) }} value={member.dni}
                disabled={!edit}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>Numero de telefono</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" placeholder="Ingrese un numero de contacto. Ej:3814556677"
                onChange={(e) => { changePhoneNumber(e.target.value) }} value={member.phoneNumber}
                disabled={!edit}
              />
            </FormControl>
          </Grid>
        </Grid>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral"
              onClick={() => { navigate("../list") }}>
              Cancelar
            </Button>
            <Button size="sm" variant="solid" type="submit" disabled={!edit}>
              Guardar
            </Button>
          </CardActions>
        </CardOverflow>
      </form>
    </Card>
  </>
}

export default EditMemberPage