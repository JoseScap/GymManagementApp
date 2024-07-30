import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {Breadcrumbs} from "@mui/joy";

interface Props {
  items: React.ReactNode[];
}

const AppBreadcrumbs: React.FC<Props> = ({ items }) => {
  return <Breadcrumbs
    size="sm"
    aria-label="breadcrumbs"
    separator={<ChevronRightRoundedIcon fontSize="small" />}
    sx={{ pl: 0 }}
  >
    {items.map((item, index) => (
      <span key={index}>{item}</span>
    ))}
  </Breadcrumbs>
}

export default AppBreadcrumbs;