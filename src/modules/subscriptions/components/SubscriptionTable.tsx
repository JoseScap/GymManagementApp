import { Box, Chip, ColorPaletteProp, IconButton, Table } from "@mui/joy";
import InactiveIcon from "@mui/icons-material/Block"
import DayIcon from "@mui/icons-material/WbSunny"
import WeekIcon from "@mui/icons-material/Filter7"
import MonthIcon from "@mui/icons-material/CalendarMonth"
import { MemberStatus } from "../../common/types/members";
import { ReactNode } from "react";
import Sheet from "@mui/joy/Sheet";
import { useListSubscription } from "../hooks/useListSubscriptionHooks";
import { PaymentMethod } from "../../common/types/subscription";
import dayjs from 'dayjs';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useNavigate } from "../../../../src/routers";

const startDecoratorDictionary: Record<MemberStatus, ReactNode> = {
  Inactivo: <InactiveIcon />,
  Día: <DayIcon />,
  Semana: <WeekIcon />,
  Mes: <MonthIcon />,
}

const colorDictionary: Record<MemberStatus, ColorPaletteProp> = {
  Inactivo: "danger",
  Día: "primary",
  Semana: "primary",
  Mes: "primary",
}

const startDecoratorPaymentMethod: Record<PaymentMethod, ReactNode> = {
  Efectivo: <LocalAtmRoundedIcon />,
  Transferencia: <AccountBalanceRoundedIcon />,
}

const colorPaymentMethodDictionary: Record<PaymentMethod, ColorPaletteProp> = {
  Efectivo: "success",
  Transferencia: "warning",
}

const SubscriptionTable: React.FC = () => {
    const { currentPage: { data: subscriptions } } = useListSubscription();
    const navigate = useNavigate();

  return (
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      sx={{
        display: 'initial',
        width: '100%',
        borderRadius: 'sm',
        flexShrink: 1,
        overflow: 'auto',
        minHeight: 0,
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '0px',
          '--TableCell-paddingX': '8px',
        }}
      >
        <thead>
          <tr>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Nombre completo
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Tipo
              </Box>
            </th>
            <th scope="col" >
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Desde
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Hasta
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Monto
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Medio de Pago
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="flex-end">
                Acciones
              </Box>
            </th>
          </tr>
        </thead>
        <tbody>
            {
                subscriptions.length === 0 ? (
                    <tr>
                        <td scope="col" colSpan={7}>
                            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                                No se encontraron subscripciones.
                            </Box>
                        </td>
                  </tr>
                ) : (
                    subscriptions.map(({ id: id, dateFrom: dateFrom, dateTo: dateTo, 
                        amount: amount, paymentMethod: paymentMethod, member: member }) => (
                        <tr key={id}>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                              {member.fullName}
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                              <Chip
                                variant="soft"
                                size="md"
                                startDecorator={startDecoratorDictionary[member.currentStatus]}
                                color={colorDictionary[member.currentStatus]}
                              >
                                {member.currentStatus}
                              </Chip>
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                                {dayjs(dateFrom).format('DD/MM/YYYY')}
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                                {dayjs(dateTo).format('DD/MM/YYYY')}
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                              $ {amount.toLocaleString('es-AR')}
                            </Box>
                          </td>
                          <td scope="col">
                          <Box width="100%" height="100%" display="flex" alignItems="center">
                              <Chip
                                variant="soft"
                                size="md"
                                startDecorator={startDecoratorPaymentMethod[paymentMethod]}
                                color={colorPaymentMethodDictionary[paymentMethod]}
                              >
                                {paymentMethod}
                              </Chip>
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="flex-end" gap="4px">
                              <IconButton
                                variant="outlined"
                                color="warning"
                                onClick={() => navigate('Subscription:Detail', { id })}
                              >
                                <VisibilityRoundedIcon />
                              </IconButton>
                            </Box>
                          </td>
                        </tr>
                      ))
                )
            }
        </tbody>
      </Table>
    </Sheet>
  )
}

export default SubscriptionTable