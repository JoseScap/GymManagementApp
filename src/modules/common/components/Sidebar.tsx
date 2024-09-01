import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { AttachMoneyOutlined, Close, StarsRounded} from "@mui/icons-material";
import { useNavigate } from '../../../routers';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

interface Props {
  onLock: () => void
}

export default function Sidebar({ onLock }: Props) {
  const navigate = useNavigate();

  return (
    <Sheet
      className="Sidebar"
      sx={{
        transform: {
          md: 'none',
        },
        zIndex: 10000,
        height: '100vh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">Orellana Gym</Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => navigate('Core:Home')}>
              <AttachMoneyOutlined />
              <ListItemContent>
                <Typography level="title-sm">Caja</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('Subscription:Create')}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Nueva suscripción</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('Subscription:List')}>
              <StarsRounded />
              <ListItemContent>
                <Typography level="title-sm">Lista de Suscripciones</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* <ListItem>
            <ListItemButton onClick={() => navigate('Core:MiSocio')}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Mi socío</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

          <ListItem>
            <ListItemButton onClick={() => navigate('Class:List')}>
              <ClassOutlinedIcon />
              <ListItemContent>
                <Typography level="title-sm">Lista de Clases</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={onLock}>
              <Close />
              <ListItemContent>
                <Typography level="title-sm">Bloquear</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* <ListItem>
            <ListItemButton onClick={() => navigate('Core:Notification')}>
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Notificaciones</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Sheet>
  );
}