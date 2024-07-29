import {
  Box,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import {useCreateSubscription} from "../hooks/useCreateSubscription.ts";
import {useEffect} from "react";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SubscriptionMemberSelector from "../components/SubscriptionMemberSelector.tsx";

const CreateSubscriptionPage: React.FC = () => {
  const {
    findAllMembers,
  } = useCreateSubscription()

  useEffect(() => {
    findAllMembers()
  }, []);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <GroupRoundedIcon />,
          <Typography fontWeight="bold">Subscripciones</Typography>,
          <Typography fontWeight="bold">Nueva suscripción</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Nueva suscripción</Typography>
    <SubscriptionMemberSelector />
  </>
}

export default CreateSubscriptionPage