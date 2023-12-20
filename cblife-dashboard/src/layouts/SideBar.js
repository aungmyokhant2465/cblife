import React from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
let activeStyle = {
  textDecoration: "underline",
};

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = ({ handleDrawerClose, open, auth }) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <Divider />
        <List>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
            className="nav-link"
          >
            <ListItem disablePadding className="nav-btn">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon className="nav-link-icon" />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/all_news"
            className="nav-link"
          >
            <ListItem disablePadding className="nav-btn">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon className="nav-link-icon" />
                </ListItemIcon>
                <ListItemText primary={"News Posts"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/promotions"
            className="nav-link"
          >
            <ListItem disablePadding className="nav-btn">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon className="nav-link-icon" />
                </ListItemIcon>
                <ListItemText primary={"Promotions"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/knowledges"
            className="nav-link"
          >
            <ListItem disablePadding className="nav-btn">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon className="nav-link-icon" />
                </ListItemIcon>
                <ListItemText primary={"Knowledges"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
