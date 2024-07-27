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
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

import ColorSchemeToggle from './ColorSchemeToggle';
import {useNavigate} from "react-router-dom";

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
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
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
            <ListItemButton onClick={() => navigate('/')}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Inicio</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('/analytics')}>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Analisis</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('/members')}>
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Socios</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('/subscriptions')}>
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Suscripciones</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => navigate('/notifications')}>
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