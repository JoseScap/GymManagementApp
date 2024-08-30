import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card, CardActions,
  CardOverflow,
  Chip,
  ColorPaletteProp,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  ListItemContent,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { ReactNode, useEffect, useState } from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useMember } from "../hooks/useMemberHooks.ts";
import { useParams } from "../../../routers";
import { AccountBalanceRounded, CancelRounded, LocalAtmRounded, StarRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import { toast } from "react-toastify";

const startDecoratorPaymentMethod: Record<PaymentMethod, ReactNode> = {
  Efectivo: <LocalAtmRounded />,
  Transferencia: <AccountBalanceRounded />,
}

const colorPaymentMethodDictionary: Record<PaymentMethod, ColorPaletteProp> = {
  Efectivo: "success",
  Transferencia: "warning",
}

const GetBadge = (status: PaymentMethod) => {
  return (
    <Chip
      variant="soft"
      size="md"
      startDecorator={startDecoratorPaymentMethod[status]}
      color={colorPaymentMethodDictionary[status]}
    >
      {status}
    </Chip>
  )
}

const MemberPage: React.FC = () => {
  const { member, subscriptions, getMemberById, resetValues, changeFullName, changeDni, changePhoneNumber, editMember } = useMember();

  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(-1);

  const { id: memberId } = useParams(); 

  useEffect(() => {
    if (memberId !== undefined) getMemberById(memberId);
  }, [memberId])

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editMember()
      .finally(() => {
        getMemberById(memberId!)
        setEdit(false)
        toast.success("Socio editado correctamente")
      })
  }

  const handleActiveEdit = () => {
    setEdit(prev => !prev);
    if(edit) {
      resetValues();
    }
  }


  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Socios</Typography>,
          <Typography fontWeight="bold">Lista de socios</Typography>,
          <Typography fontWeight="bold">{member.fullName}</Typography>
        ]}
      />
    </Box>
    <Typography level="h2" sx={{color: "white" }}>Perfil del Socio</Typography>
    <Card>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="success">Información del socio {`${member.fullName}`}</Typography>
            <Typography level="body-lg">Clickea en el lapiz para cambiar la información del socio</Typography>
          </Box>
        </Grid>
        <Grid xs={4} display="flex" gap="8px" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleActiveEdit}
            color={edit ? 'danger' : 'success'}
            endDecorator={edit ? <CancelRounded /> : <EditRoundedIcon />}
          >
            { edit ? "Cancelar edicion" : "Editar miembro" }
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <form onSubmit={handleEdit}>
        <Grid container spacing={2} sx={{paddingBottom: '15px'}}>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <Box display="flex" gap="5px">
              <AbcOutlinedIcon />
              <FormLabel>Apellido y Nombre</FormLabel>
            </Box>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input
                size="md"
                style={{ fontWeight: 'bold' }}
                placeholder="Ingrese el apellido y nombre del socio. Ej: Cristian Orellana."
                onChange={(e) => { if (edit) changeFullName(e.target.value) }}
                value={member.fullName}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <Box display="flex" gap="5px">
              <BadgeOutlinedIcon />
              <FormLabel>DNI</FormLabel>
            </Box>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input
                size="md"
                style={{ fontWeight: 'bold' }}
                placeholder="Ingrese el DNI. Ej: 40123456"
                onChange={(e) => { if(edit) changeDni(e.target.value) }}
                value={member.dni}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <Box display="flex" gap="5px">
              <LocalPhoneOutlinedIcon />
              <FormLabel>Numero de telefono</FormLabel>
            </Box>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input
                size="md"
                style={{ fontWeight: 'bold' }}
                placeholder="Ingrese un numero de contacto. Ej:3814556677"
                onChange={(e) => { if (edit) changePhoneNumber(e.target.value) }}
                value={member.phoneNumber ?? ''}
              />
            </FormControl>
          </Grid>
        </Grid>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="solid" color="success" type="submit" disabled={!edit}>
              Guardar
            </Button>
          </CardActions>
        </CardOverflow>
      </form>
    </Card>
    <Typography level="h3" sx={{color: "white" }}>Historial</Typography>
    <Card>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="success">Historial de {`${member.fullName}`}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <AccordionGroup>
        {
          subscriptions.map((sub, idx) => (
            <Accordion
              key={sub.id}
              expanded={index === idx}
              onChange={(_, expanded) => {
                setIndex(expanded ? idx : -1)
              }}
            >
              <AccordionSummary>
                <Avatar color={sub.isCanceled ? 'danger' : 'primary'}>
                  <StarRounded />
                </Avatar>
                <ListItemContent>
                  <Typography level="title-lg">Suscripcion {sub.isCanceled && <Chip color="danger">Cancelada</Chip>}</Typography>
                  <Typography level="body-lg">Desde {dayjs(sub.dateFrom).format("DD/MM/YYYY")} Hasta {dayjs(sub.dateTo).format("DD/MM/YYYY")}</Typography>
                </ListItemContent>
              </AccordionSummary>
              <AccordionDetails>
                <Card>
                  <Grid container spacing={2}>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                      <FormLabel>Método de Pago</FormLabel>
                      {
                        GetBadge(sub.paymentMethod)
                      }
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                      <FormLabel>Monto de la Subscripción</FormLabel>
                      <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                      >
                        <Input
                          size="sm"
                          value={sub.amount}
                          style={{ fontWeight: 'bold' }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                      <FormLabel>Fecha de Inicio de la Subscripción</FormLabel>
                      <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                      >
                        <Input
                          size="sm"
                          value={dayjs(sub.dateFrom).format("DD/MM/YYYY")}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                      <FormLabel>Fecha de Finalización de la Subscripción</FormLabel>
                      <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                      >
                        <Input
                          size="sm"
                          value={dayjs(sub.dateTo).format("DD/MM/YYYY")}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </AccordionGroup>
    </Card>
  </>
}

export default MemberPage