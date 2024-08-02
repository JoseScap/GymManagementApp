import {Box, Typography} from "@mui/joy";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import SubscriptionTable from "../components/SubscriptionTable.tsx";
import { useListSubscription } from "../hooks/useListSubscriptionHooks.ts";
import {useEffect} from "react";
import SubscriptionPaginator from "../components/SubscriptionPaginator.tsx";

const ListSubscriptionPage: React.FC = () => {
  const { numberPage, findAllSubscription } = useListSubscription()

  useEffect(() => {
    findAllSubscription()
  }, [numberPage]);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Lista de Subscripciones</Typography>
        //   TODO: Definir como será el breadcrumb para todos los lugares de la App.
        ]}
      />
    </Box>
    <Typography level="h2">Lista de Subscripciones</Typography>
    <SubscriptionTable />
    <SubscriptionPaginator />
  </>
}

export default ListSubscriptionPage