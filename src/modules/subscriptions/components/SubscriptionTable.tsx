import { Box, Button, Chip, ColorPaletteProp, IconButton, Table, Typography } from "@mui/joy";
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
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { NumbersOutlined, PersonOutlineRounded } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';

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
    const { hasMore, subscriptions, findNextPage, changeIdToDelete } = useListSubscription();
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
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center">
                <Typography startDecorator={<PersonOutlineRounded />}>
                  Nombre completo
                </Typography>
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center">
                <Typography startDecorator={<NumbersOutlined />}>
                  DNI
                </Typography>
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center">
                <Typography startDecorator={<DayIcon />}>
                  Tipo
                </Typography>
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center">
                <Typography startDecorator={<DateRangeOutlinedIcon />}>
                  Desde
                </Typography>
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center" gap="3px">
                <Typography startDecorator={<DateRangeOutlinedIcon />}>
                  Hasta
                </Typography>
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center" gap="3px">
                <Typography startDecorator={<AttachMoneyOutlinedIcon />}>
                  Monto
                </Typography>
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" alignItems="center">
                <LocalAtmRoundedIcon />
                Medio de Pago
              </Box>
            </th>
            <th scope="col" style={{ backgroundColor: "#fff" }}>
              <Box width="100%" height="100%" display="flex" 
              alignItems="center" justifyContent="right">
                Acciones
              </Box>
            </th>
          </tr>
        </thead>
        <tbody>
            {
                subscriptions.length === 0 ? (
                    <tr>
                        <td scope="col" colSpan={8}>
                            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                                No se encontraron subscripciones.
                            </Box>
                        </td>
                  </tr>
                ) : (
                    subscriptions.map(({ id: id, dateFrom: dateFrom, dateTo: dateTo, 
                        amount: amount, paymentMethod: paymentMethod, member: member, isCanceled: isCanceled }) => (
                        <tr key={id} >
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                              <Typography startDecorator={<PersonOutlineRounded />} fontWeight='bold'>
                                {member!.fullName}
                                {
                                  isCanceled && (
                                    <Chip
                                      variant="soft"
                                      size="sm"
                                      color="danger"
                                      startDecorator={<InactiveIcon />}
                                      sx={{ marginLeft: '5px' }}
                                    >
                                    </Chip>
                                  )
                                }
                              </Typography>
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                              {member!.dni}
                            </Box>
                          </td>
                          <td scope="col">
                            <Box width="100%" height="100%" display="flex" alignItems="center">
                              <Chip
                                variant="soft"
                                size="md"
                                startDecorator={startDecoratorDictionary[member!.currentStatus]}
                                color={colorDictionary[member!.currentStatus]}
                              >
                                {member!.currentStatus}
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
                              <Typography startDecorator={<AttachMoneyOutlinedIcon />}>
                                {amount.toLocaleString('es-AR')}
                              </Typography>
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
                            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="right" gap="5px">
                              <IconButton
                                variant="outlined"
                                color="neutral"
                                onClick={() => navigate('Member:Detail', { id: member!.id })}
                              >
                                <VisibilityRoundedIcon />
                              </IconButton>
                              <IconButton
                                variant="outlined"
                                color={!isCanceled ? "danger" : "success"}
                                onClick={() => changeIdToDelete(id)}
                              >
                                {!isCanceled ? <DeleteOutlineOutlinedIcon /> : <RestoreOutlinedIcon />}
                              </IconButton>
                            </Box>
                          </td>
                        </tr>
                      ))
                )
            }
            <tr>
              <td scope="col" colSpan={8} style={{ padding: 0 }}>
                <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                  <Button fullWidth style={{ margin: 0 }} color="success" disabled={!hasMore} onClick={() => findNextPage()}>Cargar más</Button>
                </Box>
              </td>
            </tr>
        </tbody>
      </Table>
    </Sheet>
  )
}

export default SubscriptionTable