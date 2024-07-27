import {Box, Typography} from "@mui/joy";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AppBreadcrumbs from "../../core/components/AppBreadcrumbs.tsx";
import MemberTable from "../components/MemberTable.tsx";
import {useMemberList} from "../hooks/useMemberListHooks.ts";
import {useEffect} from "react";

const MemberListPage: React.FC = () => {
  const { findAllMembers } = useMemberList()

  useEffect(() => {
    findAllMembers()
  }, []);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Lista de socios</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Lista de socios</Typography>
    <MemberTable />
  </>
}

export default MemberListPage