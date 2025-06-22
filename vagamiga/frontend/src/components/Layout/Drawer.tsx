import {
  Home as HomeIcon,
  Receipt as LocacaoIcon,
  Person as ProfileIcon,
  Assessment as RelatorioIcon,
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

const CustomDrawer = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: () => void;
}) => {
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

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/registro">
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText primary="Cadastro de Usuário" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/vagas">
              <ListItemIcon>
                <VagaIcon />
              </ListItemIcon>
              <ListItemText primary="Vagas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/locacoes">
              <ListItemIcon>
                <LocacaoIcon />
              </ListItemIcon>
              <ListItemText primary="Locações" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/relatorios">
              <ListItemIcon>
                <RelatorioIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
            </ListItemButton>
          </ListItem>
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
