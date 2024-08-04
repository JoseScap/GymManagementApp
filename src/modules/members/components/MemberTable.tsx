import { Box, ColorPaletteProp, IconButton, Table } from "@mui/joy";
import { useMemberList } from "../hooks/useMemberListHooks.ts";
import Chip from "@mui/joy/Chip";
import InactiveIcon from "@mui/icons-material/Block"
import DayIcon from "@mui/icons-material/WbSunny"
import WeekIcon from "@mui/icons-material/Filter7"
import MonthIcon from "@mui/icons-material/CalendarMonth"
import { MemberStatus } from "../../common/types/members";
import { ReactNode } from "react";
import Sheet from "@mui/joy/Sheet";
import { DeleteForeverRounded } from "@mui/icons-material";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useNavigate } from "../../../routers/AppRouter.tsx";

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

const MemberTable: React.FC = () => {
  const { currentPage: { data: members }, changeIdToDelete } = useMemberList()
  const navigate = useNavigate()

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
                Estado
              </Box>
            </th>
            <th scope="col" >
              <Box width="100%" height="100%" display="flex" alignItems="center">
                DNI
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center">
                Numero de telefono
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
            members.length === 0 ? (
              <tr>
                <td scope="col" colSpan={5}>
                  <Box width="100%" height="100%" display="flex" alignItems="center">
                    No se encontraron socios
                  </Box>
                </td>
              </tr>
            ) : (
              members.map(({ id, dni, currentStatus, phoneNumber, fullName }) => (
                <tr key={id}>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center">
                      {fullName}
                    </Box>
                  </td>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center">
                      <Chip
                        variant="soft"
                        size="md"
                        startDecorator={startDecoratorDictionary[currentStatus]}
                        color={colorDictionary[currentStatus]}
                      >
                        {currentStatus}
                      </Chip>
                    </Box>
                  </td>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center">
                      {dni}
                    </Box>
                  </td>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center">
                      {phoneNumber}
                    </Box>
                  </td>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="flex-end" gap="4px">
                      <IconButton
                        variant="outlined"
                        color="warning"
                        onClick={() => navigate('Member:Detail', { id })}
                      >
                        <VisibilityRoundedIcon />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="danger"
                        onClick={() => changeIdToDelete(id)}
                      >
                        <DeleteForeverRounded />
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

export default MemberTable