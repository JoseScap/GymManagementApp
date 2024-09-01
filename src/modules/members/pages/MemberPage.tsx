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
  Step,
  StepIndicator,
  Stepper,
  Option,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { ReactNode, useEffect, useState } from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useMember } from "../hooks/useMemberHooks.ts";
import { AccountBalanceRounded, CancelOutlined, CancelRounded, FingerprintOutlined, LocalAtmRounded, StarRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "../../../routers";
import dayjs from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import { toast } from "react-toastify";
import { Check } from "lucide-react";
import { Select } from "@mui/joy";
import { useSubscriptionHooks } from "../../subscriptions/hooks/useSubscriptionHooks.ts";

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
  const {
    member,
    subscriptions,
    captureStep,
    fingerTemplate,
    getMemberById,
    resetValues,
    changeFullName,
    changeDni,
    changePhoneNumber,
    editMember,
    changeCaptureStep,
    createNewFingerprint
  } = useMember();
  const { updateSubscriptionById } = useSubscriptionHooks()


  const [edit, setEdit] = useState(false);
  const [editSubscription, setEditSubscription] = useState(false);
  const [index, setIndex] = useState(-1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Efectivo")
  const [amount, setAmount] = useState(0);


  const { id: memberId } = useParams(); 
  const navigate = useNavigate();

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

  const handleEditSubscription = (id: string): void => {

    updateSubscriptionById(id, amount, paymentMethod)
    .finally(
      () => {
        toast.success("Suscripción editada correctamente")
        navigate("Subscription:List")
      }
    )
  }

  const handleChangePaymentMethod = (
    newValue: PaymentMethod | null,
  ) => {
    if (paymentMethod !== null) setPaymentMethod(newValue!)
  }

  const handleActiveEdit = () => {
    setEdit(prev => !prev);
    if(edit) {
      resetValues();
    }
  }

  const handleActiveEditSubscription = (amount: number, paymentMethod: PaymentMethod) => {
    setEditSubscription(prev => !prev);

    if(!editSubscription) {
      setAmount(amount);
      setPaymentMethod(paymentMethod);
    } else {
      setAmount(0);
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
    <Card>
      <Box sx={{ mb: 1 }}>
        <Box display="flex" gap="5px">
          {member.fingerprintId > 0 ? (
            <FingerprintOutlined />
          ) : (
            <CancelOutlined />
          )}
          <Typography level="title-lg" color={member.fingerprintId > 0 ? "success" : "danger"}>Identificacion por huella.</Typography>
        </Box>
        <Typography level="body-md">{member.fingerprintId > 0 ? "El usuario tiene huella activa" : "El usuario no tiene huella activa"}</Typography>
      </Box>
      <Divider />
      <Grid container spacing={2}>
        <Grid xs={2}>
        <Button
          fullWidth
          disabled={fingerTemplate != null}
          color={
            fingerTemplate !== null
              ? 'neutral'
              : captureStep > 0
              ? 'danger'
              : 'success' 
          }
          onClick={() => {
            if (captureStep === 0) changeCaptureStep(1)
            else changeCaptureStep(0)
          }}
        >
          {
            captureStep > 0 ? "Cancelar registro" : "Iniciar registro"
          }
        </Button>
        </Grid>
        {(captureStep >= 1 || fingerTemplate != null) &&
        <>
          <Grid xs={8}>
            <Stepper>
              <Step
                indicator={
                  <StepIndicator
                    variant={captureStep < 2 && fingerTemplate == null ? 'soft' : 'solid'}
                    color={captureStep < 2 && fingerTemplate == null ? 'neutral' : 'success'}
                  >
                    {captureStep < 2 && fingerTemplate == null ? 1 : <Check />}
                  </StepIndicator>
                }
              >
                <Typography>Primera huella</Typography>
              </Step>
              <Step
                indicator={
                  <StepIndicator
                    variant={captureStep < 3 && fingerTemplate == null ? 'soft' : 'solid'}
                    color={captureStep < 3 && fingerTemplate == null ? 'neutral' : 'success'}
                  >
                    {captureStep < 3 && fingerTemplate == null ? 2 : <Check />}
                  </StepIndicator>
                }
              >
                <Typography>Segunda huella</Typography>
              </Step>
              <Step
                indicator={
                  <StepIndicator
                    variant={fingerTemplate == null ? 'soft' : 'solid'}
                    color={fingerTemplate == null ? 'neutral' : 'success'}
                  >
                    {fingerTemplate == null ? 3 : <Check />}
                  </StepIndicator>
                }
              >
                <Typography>Huella registrada</Typography>
              </Step>
            </Stepper>
          </Grid>
          <Grid xs={2}>
            <Button fullWidth color="success" disabled={!memberId || !fingerTemplate} onClick={() => createNewFingerprint(memberId!, fingerTemplate!, member.fingerprintId ?? 0)}>Cargar nueva huella</Button>
          </Grid>
        </>
        }
      </Grid>
    </Card>
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
                <Avatar color={sub.isCanceled ? 'danger' : 'success'}>
                  <StarRounded />
                </Avatar>
                <ListItemContent>
                  <Typography level="title-lg">Suscripcion {sub.isCanceled && <Chip color="danger">Cancelada</Chip>}</Typography>
                  <Typography level="body-lg">Desde {dayjs(sub.dateFrom).format("DD/MM/YYYY")} Hasta {dayjs(sub.dateTo).format("DD/MM/YYYY")}</Typography>
                </ListItemContent>
              </AccordionSummary>
              <AccordionDetails>
                <Card>
                  <Grid xs={4} display="flex" gap="8px" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      onClick={() => { handleActiveEditSubscription(sub.amount, sub.paymentMethod) }}
                      color={editSubscription ? 'danger' : 'success'}
                      endDecorator={editSubscription ? <CancelRounded /> : <EditRoundedIcon />}
                    >
                      {editSubscription ? "Cancelar Edición" : "Editar suscripción"}
                    </Button>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                      <FormLabel>Método de Pago</FormLabel>
                      <>
                        {
                          editSubscription ? (
                            <FormControl>
                              <Select
                                color="success"
                                placeholder="Seleccione un método de pago"
                                variant="outlined"
                                value={paymentMethod ? paymentMethod : sub.paymentMethod}
                                onChange={(event, value) => {
                                  event?.preventDefault()
                                  handleChangePaymentMethod(value)
                                }}
                              >
                                <Option value="Efectivo">Efectivo</Option>
                                <Option value="Transferencia">Transferencia</Option>
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography level="body-lg">{GetBadge(sub.paymentMethod)}</Typography>
                          )
                        }
                      </>
                    </Grid>
                    <Grid xs={6} display="flex" gap="8px" flexDirection="column">
                      <FormLabel>Monto de la Subscripción</FormLabel>
                      <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                      >
                        <Input
                          size="sm"
                          value={!editSubscription ? sub.amount : amount}
                          onChange={(e) => { if(editSubscription) setAmount(Number(e.target.value)) }}
                          style={{ fontWeight: 'bold' }}
                          disabled={!editSubscription}
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
                          disabled={true}
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
                          disabled={true}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                      <Button size="sm" variant="solid" color="success" type="submit" disabled={!editSubscription} 
                        onClick={() => { handleEditSubscription(sub.id) }}>
                        Guardar
                      </Button>
                    </CardActions>
                  </CardOverflow>
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