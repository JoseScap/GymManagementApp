import React, {PropsWithChildren} from "react";
import {Box, IconButton, Typography} from "@mui/joy";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import {brandColor} from "../constants/styles.ts";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {

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
        <IconButton>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography level="h2">Orellana</Typography>
      </Box>
    </Box>
    <Box width={"100%"} maxWidth={"90vw"} margin={"16px auto"}>
      {children}
    </Box>
  </Box>
}

export default PageLayout