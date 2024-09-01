import { Autocomplete, Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, Grid, Input, Radio, RadioGroup, Step, StepIndicator, Stepper, Typography } from "@mui/joy";
import { Member,  MemberStatus } from "../../common/types/members";
import { useCreateSubscription } from "../hooks/useCreateSubscription.ts";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import { useNavigate } from "../../../routers";
import { AccountBalanceOutlined, AttachMoneyOutlined, Check, LocalAtmOutlined, PersonOutlineRounded, PhoneAndroidOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import WbSunny from "@mui/icons-material/WbSunny";
import { CalendarCheck } from "lucide-react";
import { toast } from "react-toastify";

const memberStatusOptions: MemberStatus[] = ['Día', 'Semana', 'Mes']
const paymentMethodOptions: PaymentMethod[] = ['Efectivo', 'Transferencia']

const SubscriptionMemberForm: React.FC = () => {
  const navigate = useNavigate()
  const {
    amount,
    captureStep,
    dateFrom,
    dateTo,
    fingerTemplate,
    members,
    memberStatus,
    isNewMember,
    paymentMethod,
    selectedMember,
    step,
    changeAmount,
    changeCaptureStep,
    changeDateFrom,
    changeDateTo,
    changeMemberStatus,
    changeIsNewMember,
    changePaymentMethod,
    changeSelectedMember,
    changeSelectedMemberProp,
    subscribeMember,
    changeStep
  } = useCreateSubscription()

  const handleChangeMemberStatus = (status: MemberStatus) => {
    changeMemberStatus(status)
    changeDateFrom(null)
    changeDateTo(null)
  }

  const handleChangeDateFrom = (date: Dayjs | null) => {
    let newDateTo = date === null ? date : date.clone()

    if (memberStatus === 'Semana' && newDateTo !== null) {
      newDateTo = newDateTo.add(1, 'week')
    }

    if (memberStatus === 'Mes' && newDateTo !== null) {
      newDateTo = newDateTo.add(1, 'month')
    }

    changeDateFrom(date)
    changeDateTo(newDateTo)
  }

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAmount(+e.target.value)
  }

  const handleIsChangeNewMember = (value: boolean) => {
    changeIsNewMember(value)
    changeStep(2)
    if (value === true) {
      changeSelectedMember({
        id: '',
        dni: '',
        currentStatus: 'Inactivo',
        fullName: '',
        phoneNumber: '',
        isActive: true,
      })
    } else {
      changeSelectedMember(null)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    subscribeMember()
      .finally(() => {
        navigate('Subscription:List')
        toast.success('Se cargo una nueva suscripción')
      })
  }

  return <form onSubmit={handleSubmit}>
    <Grid container spacing={2} marginBottom={4}>
      {step >= 1 && (
        <Grid xs={12}>
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-lg" color="success">¿Es un miembro nuevo?</Typography>
              <Typography level="body-md">Indique si el miembro ya asistió a este gimnasio previamente.</Typography>
            </Box>
            <Divider />
            <Grid container spacing={2}>
              <Grid xs={6} display="flex" gap="8px" flexDirection="row">
                <RadioGroup>
                  <Radio
                    label={"Miembro nuevo"}
                    value={true}
                    onChange={() => handleIsChangeNewMember(true)}
                    checked={isNewMember === true}
                    name="newMember"
                    slotProps={{ input: { 'aria-label': "Miembro nuevo" } }}
                    required
                    style={{ fontWeight: 'bold' }}
                  />
                  <Radio
                    label={"Miembro existente"}
                    value={true}
                    onChange={() => handleIsChangeNewMember(false)}
                    checked={isNewMember === false}
                    name="newMember"
                    slotProps={{ input: { 'aria-label': "Miembro existente" } }}
                    required
                    style={{ fontWeight: 'bold' }}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}

      {step >= 2 && (
      <Grid xs={12}>
        {!isNewMember && (
        <Card>
          <Box>
            <Box display="flex" gap="5px">
                <ContactEmergencyOutlinedIcon />
                <Typography level="title-lg" color="success">Información del socio</Typography>
            </Box>
            <Typography level="body-md">Seleccioné el socio a suscribir.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<ContactEmergencyOutlinedIcon />}>DNI</Typography>
              <Autocomplete
                size="md"
                placeholder="Ingrese el DNI del socio. Ej: 40401501"
                style={{ fontWeight: 'bold' }}
                options={members}
                getOptionLabel={option => option.dni}
                getOptionKey={option => option.id}
                value={selectedMember}
                onChange={
                  (_, newValue) => changeSelectedMember(newValue as Member)
                }
                required
              />
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <Typography startDecorator={<PersonOutlineRounded />} style={{ fontWeight: 'bold' }}>Apellido y nombre</Typography>
              <Autocomplete
                size="md"
                placeholder="Ingrese el nombre del socio. Ej: Juan Perez."
                style={{ fontWeight: 'bold' }}
                options={members}
                getOptionLabel={option => option.fullName}
                getOptionKey={option => option.id}
                value={selectedMember}
                onChange={
                  (_, newValue) => changeSelectedMember(newValue as Member)
                }
                required
              />
            </Grid>
          </Grid>
        </Card>
        )}

        {isNewMember && (
        <Card>
          <Box>
            <Box display="flex" gap="5px">
              <ContactEmergencyOutlinedIcon />
              <Typography level="title-lg" color="success">Información del nuevo socio</Typography>
            </Box>
            <Typography level="body-md">Ingresa en el formulario la informacion del nuevo socio.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<PersonOutlineRounded />}>Apellido y nombre</Typography>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input
                  size="md"
                  placeholder="Ingrese el apellido y nombre del socio. Ej: Cristian Orellana."
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => { changeSelectedMemberProp('fullName', e.target.value) }}
                  value={selectedMember?.fullName}
                  required
                />
              </FormControl>
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<ContactEmergencyOutlinedIcon />}>DNI</Typography>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input
                  size="md"
                  placeholder="Ingrese el DNI. Ej: 40123456"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => { changeSelectedMemberProp('dni', e.target.value) }}
                  value={selectedMember?.dni}
                  required
                />
              </FormControl>
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<PhoneIphoneOutlined />}>Numero de telefono (Opcional)</Typography>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input
                  size="md"
                  placeholder="Ingrese un numero de contacto. Ej: 3814556677"
                  style={{ fontWeight: 'bold' }}
                  onChange={(e) => { changeSelectedMemberProp('phoneNumber', e.target.value) }}
                  value={selectedMember?.phoneNumber}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Card>
        )}
      </Grid>
      )}

      {step >= 2 && (
      <Grid xs={12}>
        {!isNewMember && (<></>)}
        
        {isNewMember && (
        <Card>
          <Box sx={{ mb: 1 }}>
            <Box display="flex" gap="5px">
              <FingerprintOutlinedIcon />
              <Typography level="title-lg" color="success">Identificacion por huella.</Typography>
            </Box>
            <Typography level="body-md">Inicie la identificación por huella.</Typography>
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
              <Grid xs={10}>
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
            }
          </Grid>
        </Card>
        )}
      </Grid>
      )}

      {step >= 2 && (
      <Grid xs={12}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Box display="flex" gap="5px">
                <InfoOutlinedIcon />
                <Typography level="title-lg" color="success">Información de la suscripción</Typography>
            </Box>
            <Typography level="body-md">Indique el periodo de asistencia habilitada.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<WbSunny />}>Tipo de suscripción</Typography>
              <RadioGroup>
                {
                  memberStatusOptions.map((option) => (
                    <Radio
                      key={option}
                      label={option}
                      value={option}
                      onChange={() => handleChangeMemberStatus(option)}
                      checked={memberStatus === option}
                      color="success"
                      name="memberStatus"
                      slotProps={{ input: { 'aria-label': option } }}
                      required
                      style={{ fontWeight: 'bold' }}
                    />
                  ))
                }
              </RadioGroup>
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<CalendarCheck />}>Fecha de inicio</Typography>
              <DatePicker
                value={dateFrom}
                onChange={handleChangeDateFrom}
                disabled={memberStatus === 'Inactivo'}
                format="DD/MM/YYYY"
              />
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<CalendarCheck />}>Fecha de vencimiento (Último dia permitido)</Typography>
              <DatePicker
                value={dateTo}
                onChange={(newValue) => changeDateTo(newValue)}
                disabled={memberStatus === 'Día' || memberStatus === 'Inactivo'}
                format="DD/MM/YYYY"
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      )}

      {step >= 2 && (
      <Grid xs={12}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Box display="flex" gap="5px">
                <AttachMoneyOutlinedIcon />
                <Typography level="title-lg" color="success">Información del pago</Typography>
            </Box>
            <Typography level="body-md">Indique la modalidad de pago utilizada</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<AccountBalanceOutlined />}>Forma de pago</Typography>
              <RadioGroup>
                {
                  paymentMethodOptions.map((option) => (
                    <Radio
                      key={option}
                      label={option}
                      value={option}
                      color="success"
                      onChange={() => changePaymentMethod(option)}
                      checked={paymentMethod === option}
                      name="paymentMethod"
                      slotProps={{ input: { 'aria-label': option } }}
                      required
                      style={{ fontWeight: 'bold' }}
                    />
                  ))
                }
              </RadioGroup>
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <Typography style={{ fontWeight: 'bold' }} startDecorator={<AttachMoneyOutlined />}>Monto</Typography>
              <Input
                size="md"
                value={amount}
                onChange={handleChangeAmount}
                type="number"
                required
                style={{ fontWeight: 'bold' }}
              />
            </Grid>
          </Grid>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancelar
              </Button>
              <Button size="sm" variant="solid" color="success" type="submit">
                Guardar
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Grid>
      )}
    </Grid>
  </form>
}

export default SubscriptionMemberForm;