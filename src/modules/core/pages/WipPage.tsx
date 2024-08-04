import { Alert, Box, Typography } from "@mui/joy";
import AppBreadcrumbs from "../../common/components/AppBreadcrumbs.tsx";
import WarningAmberRoundedIcon  from "@mui/icons-material/WarningAmberRounded";

const WipPage: React.FC = () => {
  return <>
    <Box>
      <AppBreadcrumbs
        items={[
          <WarningAmberRoundedIcon />,
          <Typography fontWeight="bold">WIP</Typography>
        ]}
      />
    </Box>
    <Typography level="h2">Estamos trabajando</Typography>
    <Alert
        variant="solid"
        color="warning"
        startDecorator={<WarningAmberRoundedIcon />}
      >
        Esta pagina se disponibilizara pronto.
      </Alert>
  </>
}

export default WipPage;