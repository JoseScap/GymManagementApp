import { Box, Button, Chip, IconButton, Table } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { useClassListHooks } from "../hooks/useClassListHooks";
import dayjs from "dayjs";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import InactiveIcon from "@mui/icons-material/Block"
import { Trash2 } from "lucide-react";

const ClassTable: React.FC = () => {
  const { classes, changeIdToDelete, findNextPage, hasMore } = useClassListHooks()

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
              <Box width="100%" height="100%" display="flex"
                justifyContent="start" alignItems="center">
                Nombre de la Clase
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex"
                justifyContent="start" alignItems="center" gap="3px">
                Profesor
                <PermIdentityOutlinedIcon />
              </Box>
            </th>
            <th scope="col" >
              <Box width="100%" height="100%" display="flex"
                justifyContent="start" alignItems="center" gap="3px">
                Total
                <AttachMoneyOutlinedIcon />
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="start" gap="3px">
                Asistentes
                <PeopleOutlineOutlinedIcon />
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex"
                alignItems="center" justifyContent="start" gap="3px">
                Fecha
                <DateRangeOutlinedIcon />
              </Box>
            </th>
            <th scope="col">
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="right"
              >
                Acciones
              </Box>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            classes.length > 0 ? classes
              .map((gymClass) => (
                <tr key={gymClass.id}>
                  <td>
                    <Box display="flex" alignItems="center" gap="3px">
                      {
                        gymClass.className
                      }
                      {
                      gymClass.isCanceled && (
                        <Chip
                          variant="soft"
                          size="md"
                          color="danger"
                          startDecorator={<InactiveIcon />}
                        >
                          Cancelada
                        </Chip>
                      )
                      }
                    </Box>
                  </td>

                  <td>
                    <Box display="flex" alignItems="center">
                      {gymClass.professor}
                    </Box>
                  </td>
                  <td>
                    <Box display="flex" alignItems="center">
                      {gymClass.total}
                    </Box>
                  </td>
                  <td>
                    <Box display="flex" alignItems="center">
                      {gymClass.countAssistant}
                    </Box>
                  </td>
                  <td>
                    <Box display="flex" alignItems="center">
                      {dayjs(gymClass.date).format('DD/MM/YYYY')}
                    </Box>
                  </td>
                  <td scope="col">
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      justifyContent="right"
                      alignItems="center"
                      gap="25px"
                    >
                      <IconButton
                        variant="outlined"
                        color={ gymClass.isCanceled ? 'success' : 'danger' }
                        onClick={() => changeIdToDelete(gymClass.id)}
                      >
                        {
                          gymClass.isCanceled
                            ? <RestoreOutlinedIcon />
                            : <Trash2 />
                        }
                      </IconButton>
                    </Box>
                  </td>
                </tr>
              ))
              : (
              <tr>
                <td colSpan={6}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    No hay clases registradas
                  </Box>
                </td>
              </tr>
            )
          }
          <tr>
              <td scope="col" colSpan={6} style={{ padding: 0 }}>
                <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                  <Button
                    fullWidth
                    style={{ margin: 0 }} 
                    color="success"
                    onClick={() => findNextPage()}
                    disabled={!hasMore}
                  >
                    Cargar más
                  </Button>
                </Box>
              </td>
          </tr>
        </tbody>
      </Table>
    </Sheet>
  )
}

export default ClassTable