import {
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
  IconButton,
  Input,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import { ReactNode, useEffect, useState } from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { useSubscriptionHooks } from "../hooks/useSubscriptionHooks.ts";
import { PaymentMethod } from "../../common/types/subscription";
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { useNavigate, useParams } from "../../../routers/useRouterHooks.ts";
import { DeleteForeverRounded, StarsRounded } from "@mui/icons-material";
import SubscriptionDeleteModal from "../components/SubscriptionDeleteModal.tsx";
import DoNotDisturbRoundedIcon from '@mui/icons-material/DoNotDisturbRounded';

const startDecoratorPaymentMethod: Record<PaymentMethod, ReactNode> = {
  Efectivo: <LocalAtmRoundedIcon />,
  Transferencia: <AccountBalanceRoundedIcon />,
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

const SubscriptionPage: React.FC = () => {
  const { subscription, lastAmount, getMemberBySubscriptionId, resetValues, changeSubscriptionAmount, alternateModal } = useSubscriptionHooks();

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const { id: subscriptionId } = useParams();

  useEffect(() => {
    if (!subscriptionId) {
      return;
    }
    getMemberBySubscriptionId(subscriptionId);
  }, [subscriptionId])

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // editMember().finally(() => {
    //   changeFullName("");
    //   changeDni("");
    //   changePhoneNumber("");
    //   navigate("../list");
    // })
  }

  const handleActiveEdit = () => {
    setEdit(prev => !prev);
    if (edit) {
      resetValues();
    }
  }


  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <StarsRounded />,
            <Typography fontWeight="bold">Subscripciones</Typography>,
            <Typography fontWeight="bold">Lista de Subscripciones</Typography>,
            <Typography fontWeight="bold">Socio {`${subscription.fullName}`}</Typography>,
        ]}
      />
    </Box>

    <Box sx={{ display: 'flex', gap: '20px'}}>
      <Typography level="h2">Subscripción</Typography>
    </Box>
    <Card>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-lg" color="primary">Información de la subscripción del socio {`${subscription.fullName}`}</Typography>
            <Typography level="body-sm">Solamente puedes cambiar el monto de la suscripción en un plazo menor a 1 día.</Typography>
          </Box>
        </Grid>
        <Grid xs={4} display="flex" gap="8px" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          {
            subscription.isCanceled ? (
              <Chip
                variant="soft"
                size="md"
                color="danger"
                startDecorator={<DoNotDisturbRoundedIcon />}
              >
                Anulada
              </Chip>
            ) : (
              <>

                <IconButton
                  variant="outlined"
                  color="warning"
                  onClick={handleActiveEdit}
                >
                  <EditRoundedIcon />
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="danger"
                  onClick={() => { resetValues() }}
                >
                  <ReplayRoundedIcon />
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="danger"
                  onClick={() => { alternateModal() }}
                >
                  <DeleteForeverRounded />
                </IconButton>
              </>
            )
          }

        </Grid>
      </Grid>
      <Divider />
      <form onSubmit={() => { }}>
        <Grid container spacing={2} sx={{ paddingBottom: '15px' }}>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>Apellido y nombre</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" value={subscription.fullName}
                disabled={true}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} display="flex" gap="8px" flexDirection="column">
            <FormLabel>DNI</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >
              <Input size="sm" value={subscription.dni}
                disabled={true}
              />
            </FormControl>
          </Grid>
        </Grid>
        <form onSubmit={handleEdit}>
          <Grid container spacing={2} sx={{ paddingBottom: '15px' }}>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Método de Pago</FormLabel>
              {
                GetBadge(subscription.paymentMethod)
              }
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Monto de la Subscripción</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input size="sm" defaultValue={lastAmount} value={subscription.amount}
                  onChange={(e) => { changeSubscriptionAmount(Number(e.target.value)) }}

                  disabled={!edit}
                />
              </FormControl>
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Fecha de Inicio de la Subscripción</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input size="sm" value={subscription.dateFrom}
                  disabled={true}
                />
              </FormControl>
            </Grid>
            <Grid xs={6} display="flex" gap="8px" flexDirection="column">
              <FormLabel>Fecha de Finalización de la Subscripción</FormLabel>
              <FormControl
                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
              >
                <Input size="sm" value={subscription.dateTo}
                  disabled={true}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Divider />

        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="outlined" color="neutral"
              onClick={() => { navigate("Subscription:List") }}>
              Volver atrás
            </Button>
            {
              subscription.isCanceled ? (
                <>
                </>
              ) : (
                <Button size="sm" variant="solid" type="submit" disabled={!edit}
                >
                  Guardar
                </Button>
              )
            }

          </CardActions>
        </CardOverflow>
      </form>
    </Card>
    <SubscriptionDeleteModal />
  </>
}

export default SubscriptionPage