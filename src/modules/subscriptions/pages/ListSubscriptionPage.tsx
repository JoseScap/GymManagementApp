import {Box, Typography} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import SubscriptionTable from "../components/SubscriptionTable.tsx";
import { useListSubscription } from "../hooks/useListSubscriptionHooks.ts";
import {useEffect} from "react";
import { StarsRounded } from "@mui/icons-material";
import SubscriptionDeleteModal from "../components/SubscriptionDeleteModal.tsx";

const ListSubscriptionPage: React.FC = () => {
  const { findNextPage } = useListSubscription()

  useEffect(() => {
    findNextPage()
  }, []);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <StarsRounded />,
          <Typography fontWeight="bold">Subscripciones</Typography>,
          <Typography fontWeight="bold">Lista de Subscripciones</Typography>
        ]}
      />
    </Box>
    <Typography level="h2" sx={{ color: "white" }}>Lista de Subscripciones</Typography>
    <SubscriptionTable />
    <SubscriptionDeleteModal />
  </>
}

export default ListSubscriptionPage