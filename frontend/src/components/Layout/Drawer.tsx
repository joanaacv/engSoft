import {
  Apartment as CondominioIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Receipt as LocacaoIcon,
  Person as ProfileIcon,
  Assessment as RelatorioIcon,
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
      variant="temporary" // <-- aqui, para poder abrir/fechar
      anchor="left"
      open={open}
      onClose={toggleDrawer} // fecha ao clicar fora
      ModalProps={{
        keepMounted: true, // para melhorar performance em mobile
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
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/condominios">
              <ListItemIcon>
                <CondominioIcon />
              </ListItemIcon>
              <ListItemText primary="Condomínios" />
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
