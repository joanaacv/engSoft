import {
  Apartment,
  Home as HomeIcon,
  Person as ProfileIcon,
  Receipt,
  Person as UserIcon,
  LocalParking as VagaIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CustomDrawer = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: () => void;
}) => {
  const { user } = useAuth();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        width={250}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          {user?.is_admin && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/usuarios">
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/vagas">
              <ListItemIcon>
                <VagaIcon />
              </ListItemIcon>
              <ListItemText primary="Vagas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/relatorios">
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
            </ListItemButton>
          </ListItem>

          {user?.is_admin && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/condominio">
                <ListItemIcon>
                  <Apartment />
                </ListItemIcon>
                <ListItemText primary="Condomínio" />
              </ListItemButton>
            </ListItem>
          )}
        </List>

        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Meu Perfil" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
