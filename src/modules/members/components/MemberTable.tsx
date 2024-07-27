import {Box, Table} from "@mui/joy";
import useMemberListContext from "../hooks/useMemberListHook.ts";

const MemberTable: React.FC = () => {
  const { members } = useMemberListContext()

  return (
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
              members.map(({ id, dni, isActive, phoneNumber, fullName }) => (
                <tr key={id}>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center">
                      {fullName}
                    </Box>
                  </td>
                  <td scope="col">
                    <Box width="100%" height="100%" display="flex" alignItems="center">
                      {isActive}
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
                    <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="flex-end">
                      Acciones
                    </Box>
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </Table>
  )
}

export default MemberTable