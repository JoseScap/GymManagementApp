import {Box, Typography} from "@mui/joy";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import MemberTable from "../components/MemberTable.tsx";
import {useMemberList} from "../hooks/useMemberListHooks.ts";
import {useEffect} from "react";
import MemberPaginator from "../components/MemberPaginator.tsx";
import MemberDeleteModal from "../components/MemberDeleteModal.tsx";

const MemberListPage: React.FC = () => {
  const { numberPage, findAllMembers } = useMemberList()

  useEffect(() => {
    findAllMembers()
  }, [numberPage]);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Socios</Typography>,
          <Typography fontWeight="bold">Lista de socios</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Lista de socios</Typography>
    <MemberTable />
    <MemberPaginator />
    <MemberDeleteModal/>
  </>
}

export default MemberListPage