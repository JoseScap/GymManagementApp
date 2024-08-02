import { Box, ColorPaletteProp, IconButton, Table } from "@mui/joy";
import InactiveIcon from "@mui/icons-material/Block"
import DayIcon from "@mui/icons-material/WbSunny"
import WeekIcon from "@mui/icons-material/Filter7"
import MonthIcon from "@mui/icons-material/CalendarMonth"
import { MemberStatus } from "../../common/types/members";
import { ReactNode } from "react";
import Sheet from "@mui/joy/Sheet";
import { useListSubscription } from "../hooks/useListSubscriptionHooks";
import { useNavigate } from "react-router-dom";

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

// TODO: Pedirle ayuda a José con los Types de TS para hacer un diferenciador de colores en la tabla de Subscriptions con el método de pago

const paymentMethodDictionary: Record<string, string> = {
    "Cash": "Efectivo",
    "Transfer": "Transferencia",
}

const SubscriptionTable: React.FC = () => {
    const { currentPage: { data: subscriptions } } = useListSubscription();
    // const navigate : NavigateFunction = useNavigate();

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
                                {/* TODO: Centrar este texto & ponerlo en el medio. */}
                                No se encontraron subscripciones.
                            </Box>
                        </td>
                  </tr>
                ) : (
                    <tr>
                    <td scope="col" colSpan={7}>
                      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                        No se encontraron socios
                      </Box>
                    </td>
                  </tr>
                )
            }
        </tbody>
      </Table>
    </Sheet>
  )
}

export default SubscriptionTable