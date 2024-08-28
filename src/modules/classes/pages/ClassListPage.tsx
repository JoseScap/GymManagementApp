import { Box, Button, Grid, Typography } from "@mui/joy";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import { useClassListHooks } from "../hooks/useClassListHooks.ts";
import { useEffect, useState } from "react";
import ClassTable from "../components/ClassTable.tsx";
import ClassPaginator from "../components/ClassPaginator.tsx";
import ClassDeleteModal from "../components/ClassDeleteModal.tsx";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClassCreate from "../components/ClassCreate.tsx";

const ClassListPage: React.FC = () => {
  const { numberPage, findAllClass, create, setCreate } = useClassListHooks()

  useEffect(() => {
    findAllClass()
  }, [numberPage]);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Clases</Typography>,
          <Typography fontWeight="bold">Lista de clases</Typography>
        ]}
      />
    </Box>
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Box sx={{ mb: 1 }}>
          <Typography level="h2">Lista de Clases</Typography>
        </Box>
      </Grid>
      <Grid xs={4} display="flex" gap="8px" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => setCreate(!create)}
          color={create ? 'warning' : 'primary'}
          endDecorator={<AddCircleOutlineOutlinedIcon />}
        >
          Crear Miembro
        </Button>
      </Grid>
    </Grid>
    {
      create && <ClassCreate/>
    }
    <ClassTable />
    <ClassPaginator />
    <ClassDeleteModal />
  </>
}

export default ClassListPage