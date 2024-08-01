import { Autocomplete, Box, Button, Card, CardActions, CardOverflow, Divider, FormLabel, Grid, Input, Radio, RadioGroup, Typography } from "@mui/joy";
import { Member, MemberStatus } from "../../common/types/members";
import { useCreateSubscription } from "../hooks/useCreateSubscription.ts";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import { useNavigate } from "react-router-dom";

const memberStatusOptions: MemberStatus[] = ['Dia', 'Semana', 'Mes']
const paymentMethodOptions: PaymentMethod[] = ['Efectivo', 'Transferencia']

const SubscriptionMemberForm: React.FC = () => {
  const navigate = useNavigate()
  const {
    amount,
    dateFrom,
    dateTo,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    changeAmount,
    changeDateFrom,
    changeDateTo,
    changeMemberStatus,
    changePaymentMethod,
    changeSelectedMember,
    subscribeMember
  } = useCreateSubscription()

  const handleChangeMemberStatus = (status: MemberStatus) => {
    changeMemberStatus(status)
    changeDateFrom(null)
    changeDateTo(null)
  }

  const handleChangeDateFrom = (date: Dayjs | null) => {
    let newDateTo = date === null ? date : date.clone()

    if (memberStatus === 'Semana' && newDateTo !== null) {
      newDateTo = newDateTo.add(1, 'week').add(-1, 'day')
    }

    if (memberStatus === 'Mes' && newDateTo !== null) {
      newDateTo = newDateTo.add(1, 'month').add(-1, 'day')
    }

    changeDateFrom(date)
    changeDateTo(newDateTo)
  }

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAmount(+e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    subscribeMember()
      .finally(() => navigate('/members'))
  }

  return <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información del socio</Typography>
            <Typography level="body-sm">Seleccioné el socio a suscribir.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
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
                required
              />
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Apellido y nombre</FormLabel>
              <Autocomplete
                placeholder="Ingrese el nombre del socio. Ej: Juan Perez."
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
          <Divider />
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información de la suscripción</Typography>
            <Typography level="body-sm">Indique el periodo de asistencia habilitada.</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Tipo de suscripción</FormLabel>
              <RadioGroup>
                {
                  memberStatusOptions.map((option) => (
                    <Radio
                      label={option}
                      value={option}
                      onChange={() => handleChangeMemberStatus(option)}
                      checked={memberStatus === option}
                      name="memberStatus"
                      slotProps={{ input: { 'aria-label': option } }}
                      required
                    />
                  ))
                }
              </RadioGroup>
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Fecha inicio</FormLabel>
              <DatePicker
                value={dateFrom}
                onChange={handleChangeDateFrom}
                disabled={memberStatus === 'Inactivo'}
                format="DD/MM/YYYY"
              />
            </Grid>
            <Grid xs={4} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Fecha de vencimiento (ultimo dia permitido)</FormLabel>
              <DatePicker
                value={dateTo}
                onChange={(newValue) => changeDateTo(newValue)}
                disabled={memberStatus === 'Dia' || memberStatus === 'Inactivo'}
                format="DD/MM/YYYY"
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información del pago</Typography>
            <Typography level="body-sm">Indique la modalidad de pago utilizada</Typography>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Forma de pago</FormLabel>
              <RadioGroup>
                {
                  paymentMethodOptions.map((option) => (
                    <Radio
                      label={option}
                      value={option}
                      onChange={() => changePaymentMethod(option)}
                      checked={paymentMethod === option}
                      name="paymentMethod"
                      slotProps={{ input: { 'aria-label': option } }}
                      required
                    />
                  ))
                }
              </RadioGroup>
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Monto</FormLabel>
              <Input
                value={amount}
                onChange={handleChangeAmount}
                type="number"
                required
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
    </Grid>
  </form>
}

export default SubscriptionMemberForm;