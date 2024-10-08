import {
  Box,
  Typography
} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import { useCreateSubscription } from "../hooks/useCreateSubscription.ts";
import { useEffect } from "react";
import SubscriptionMemberForm from "../components/SubscriptionMemberForm.tsx";
import { StarsRounded } from "@mui/icons-material";

const CreateSubscriptionPage: React.FC = () => {
  const {
    findAllInactiveMembers,
  } = useCreateSubscription()

  useEffect(() => {
    findAllInactiveMembers()
  }, []);

  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <StarsRounded />,
          <Typography fontWeight="bold">Subscripciones</Typography>,
          <Typography fontWeight="bold">Nueva suscripción</Typography>
        ]}
      />
    </Box>
    <Typography level="h2" sx={{ color: "white" }}>Nueva suscripción</Typography>
    <SubscriptionMemberForm />
  </>
}

export default CreateSubscriptionPage