import { AspectRatio, Autocomplete, Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Grid, Input, Radio, RadioGroup, Stack, Step, StepButton, StepIndicator, Stepper, Typography } from "@mui/joy";
import { Member, MemberField, MemberFieldValue, MemberStatus } from "../../common/types/members";
import { useCreateSubscription } from "../hooks/useCreateSubscription.ts";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import { useNavigate } from "../../../routers";
import { Check } from "@mui/icons-material";

const memberStatusOptions: MemberStatus[] = ['Día', 'Semana', 'Mes']
const paymentMethodOptions: PaymentMethod[] = ['Efectivo', 'Transferencia']

const SubscriptionMemberForm: React.FC = () => {
  const navigate = useNavigate()
  const {
    amount,
    dateFrom,
    dateTo,
    members,
    memberStatus,
    isNewMember,
    paymentMethod,
    selectedMember,
    step,
    changeAmount,
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
        phoneNumber: ''
      })
    } else {
      changeSelectedMember(null)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    subscribeMember()
      .finally(() => navigate('Subscription:List'))
  }

  return <form onSubmit={handleSubmit}>
    <Grid container spacing={2} marginBottom={4}>
      {step >= 1 && (
        <Grid xs={12}>
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-lg" color="primary">¿Es un miembro nuevo?</Typography>
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
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información del socio</Typography>
            <Typography level="body-md">Seleccioné el socio a suscribir.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel style={{ fontWeight: 'bold' }}>DNI</FormLabel>
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
              <FormLabel style={{ fontWeight: 'bold' }}>Apellido y nombre</FormLabel>
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
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información del nuevo socio</Typography>
            <Typography level="body-md">Ingresa en el formulario la informacion del nuevo socio.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <FormLabel style={{ fontWeight: 'bold' }}>Apellido y nombre</FormLabel>
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
              <FormLabel style={{ fontWeight: 'bold' }}>DNI</FormLabel>
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
              <FormLabel style={{ fontWeight: 'bold' }}>Numero de telefono</FormLabel>
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
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información de la suscripción</Typography>
            <Typography level="body-md">Indique el periodo de asistencia habilitada.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <FormLabel style={{ fontWeight: 'bold' }}>Tipo de suscripción</FormLabel>
              <RadioGroup>
                {
                  memberStatusOptions.map((option) => (
                    <Radio
                      key={option}
                      label={option}
                      value={option}
                      onChange={() => handleChangeMemberStatus(option)}
                      checked={memberStatus === option}
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
              <FormLabel style={{ fontWeight: 'bold' }}>Fecha de inicio</FormLabel>
              <DatePicker
                value={dateFrom}
                onChange={handleChangeDateFrom}
                disabled={memberStatus === 'Inactivo'}
                format="DD/MM/YYYY"
              />
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <FormLabel style={{ fontWeight: 'bold' }}>Fecha de vencimiento (Último dia permitido)</FormLabel>
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
            <Typography level="title-lg" color="primary">Información del pago</Typography>
            <Typography level="body-md">Indique la modalidad de pago utilizada</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel style={{ fontWeight: 'bold' }}>Forma de pago</FormLabel>
              <RadioGroup>
                {
                  paymentMethodOptions.map((option) => (
                    <Radio
                      key={option}
                      label={option}
                      value={option}
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
              <FormLabel style={{ fontWeight: 'bold' }}>Monto</FormLabel>
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
              <Button size="sm" variant="solid" type="submit">
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