import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import {StarsRounded} from "@mui/icons-material";
import { useNavigate } from '../../../routers/AppRouter';

function Toggler({
                   defaultExpanded = false,
                   renderToggle,
                   children,
                 }: {
  defaultExpanded?: boolean;
  children: ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
}) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
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
        {/*<ColorSchemeToggle sx={{ ml: 'auto' }} />*/}
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
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Inicio</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('Core:Dashboard')}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Analisis</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Socios</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton onClick={() => navigate('Member:Create')}>
                    Nuevo socio
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate('Member:List')}>
                    Lista de socios
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <StarsRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Suscripciones</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton onClick={() => navigate('Subscription:Create')}>
                    Nueva suscripción
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton onClick={() => navigate('Subscription:List')}>
                    Lista de Suscripciones
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('Core:Notification')}>
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Notificaciones</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}