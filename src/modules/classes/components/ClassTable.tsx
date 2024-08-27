import { Box, Table } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { useClassListHooks } from "../hooks/useClassListHooks";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import { DeleteForeverRounded } from "@mui/icons-material";

const ClassTable: React.FC = () => {
  const { currentPage: { data: gymClasses }, changeIdToDelete } = useClassListHooks()
  
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
              justifyContent="start" alignItems="center">
                Profesor
              </Box>
            </th>
            <th scope="col" >
              <Box width="100%" height="100%" display="flex" 
              justifyContent="start" alignItems="center">
                Total ($)
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="start">
                Asistentes
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" 
              alignItems="center" justifyContent="start">
                Fecha
              </Box>
            </th>
            <th scope="col">
              <Box width="100%" height="100%" display="flex" 
              alignItems="center" justifyContent="center">
                Acciones
              </Box>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            gymClasses.length > 0 ? gymClasses
            .filter((gymClass) => gymClass.isCanceled === false) /* Evaluar si esto iría aquí o no */
            .map((gymClass) => (
              <tr key={gymClass.id}>
                <td>
                  <Box display="flex" alignItems="center">
                    {
                      gymClass.className
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
                    <Box width="100%" height="100%" display="flex" 
                    justifyContent="center" alignItems="center" gap="25px">
                      <IconButton
                        variant="outlined"
                        color="danger"
                        onClick={() => changeIdToDelete(gymClass.id)}
                      >
                        <DeleteForeverRounded />
                      </IconButton>

                    </Box>
                  </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    No hay clases registradas
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

export default ClassTable