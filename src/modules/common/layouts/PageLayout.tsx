import React, {PropsWithChildren, useState} from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography
} from "@mui/joy";
import {brandColor} from "../constants/styles.ts";
import {CloseOutlined, MenuOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

type SectionItem = {
  title: string;
  navigateTo: string;
}

const mainSections: SectionItem[] = [
  { title: "Inicio", navigateTo: "/" }
]

const testSections: SectionItem[] = [
  { title: "Dummy", navigateTo: "/dummy" },
  { title: "Test", navigateTo: "/test" },
]

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return <Box>
    <Box
      bgcolor={brandColor}
      padding={"12px"}

    >
      <Box
        width={"100%"}
        maxWidth={"90vw"}
        margin={"0 auto"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <MenuOutlined />
        </IconButton>
        <Typography level="h2">Orellana</Typography>
      </Box>
    </Box>
    <Box width={"100%"} maxWidth={"90vw"} margin={"16px auto"}>
      {children}
    </Box>
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor="left"
      size="sm"
      variant="outlined"
    >
      <Box height={"100%"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={"16px"}>
          <Typography level="title-lg">Orellana</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={"16px"}>
          <List>
            {
              mainSections.map(({ title, navigateTo }, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => navigate(navigateTo)}>
                    <Typography level="body-lg" fontWeight="bold">
                      {title}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={"16px"}>
          <List>
            {
              testSections.map(({ title, navigateTo }, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => navigate(navigateTo)}>
                    <Typography level="body-lg" fontWeight="bold">
                      {title}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
      </Box>
    </Drawer>
  </Box>
}

export default PageLayout