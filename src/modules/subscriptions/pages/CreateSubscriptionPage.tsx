import {Box, Typography} from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

const CreateSubscriptionPage: React.FC = () => {
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
  </>
}

export default CreateSubscriptionPage