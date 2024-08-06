import {Box, Typography} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import SubscriptionTable from "../components/SubscriptionTable.tsx";
import { useListSubscription } from "../hooks/useListSubscriptionHooks.ts";
import {useEffect} from "react";
import SubscriptionPaginator from "../components/SubscriptionPaginator.tsx";
import { StarsRounded } from "@mui/icons-material";

const ListSubscriptionPage: React.FC = () => {
  const { numberPage, findAllSubscription } = useListSubscription()

  useEffect(() => {
    findAllSubscription()
  }, [numberPage]);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <StarsRounded />,
          <Typography fontWeight="bold">Lista de Subscripciones</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Lista de Subscripciones</Typography>
    <SubscriptionTable />
    <SubscriptionPaginator />
  </>
}

export default ListSubscriptionPage