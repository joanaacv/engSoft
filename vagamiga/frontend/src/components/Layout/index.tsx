import { Box } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar toggleDrawer={toggleDrawer} />
      <Box display="flex" flexGrow={1}>
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Box component="main" flexGrow={1} p={3} mt={8}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
