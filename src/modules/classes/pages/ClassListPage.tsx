import {Box, Typography} from "@mui/joy";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import {useClassListHooks } from "../hooks/useClassListHooks.ts";
import {useEffect} from "react";
import ClassTable from "../components/ClassTable.tsx";
import ClassPaginator from "../components/ClassPaginator.tsx";

const ClassListPage: React.FC = () => {
  const { numberPage, findAllClass } = useClassListHooks()

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
    <Typography level="h2">Lista de Clases</Typography>
    <ClassTable />
    <ClassPaginator />
  </>
}

export default ClassListPage