// import { AppBar, Box, Button, Stack, Toolbar, useTheme } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";

// interface MenuProps {
//   showMenuOptions?: boolean;
//   showLoginButtons?: boolean;
// }

// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   "&::before": {
//     content: '""',
//     display: "block",
//     position: "absolute",
//     zIndex: -1,
//     inset: 0,
//     backgroundImage:
//       "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//     backgroundRepeat: "no-repeat",
//     ...theme.applyStyles?.("dark", {
//       backgroundImage:
//         "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
//     }),
//   },
//   position: "relative", // Ensure the pseudo-element is positioned correctly
// }));
// const MenuOptionsContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   gap: theme.spacing(2),
// }));

// const LoginButtonsContainer = styled(Stack)(({ theme }) => ({
//   display: "flex",
//   gap: theme.spacing(2),
//   flexGrow: 1,
//   justifyContent: "flex-end",
// }));

// export default function Menu({
//   showMenuOptions = true,
//   showLoginButtons = true,
// }: MenuProps) {
//   const theme = useTheme();

//   return (
//     <StyledAppBar position="static">
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {showMenuOptions && (
//           <MenuOptionsContainer>
//             <Button
//               color="inherit"
//               component={Link}
//               to="/"
//               sx={{ color: theme.palette.secondary.contrastText }}
//             >
//               Início
//             </Button>
//             <Button color="inherit" component={Link} to="/vagas">
//               Pesquisar Vagas
//             </Button>
//             <Button color="inherit" component={Link} to="/anunciar">
//               Anunciar
//             </Button>
//             <Button color="inherit" component={Link} to="/alugar">
//               Alugar
//             </Button>
//           </MenuOptionsContainer>
//         )}
//         {showLoginButtons && (
//           <LoginButtonsContainer direction="row">
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//             <Button color="inherit" component={Link} to="/register">
//               Registrar
//             </Button>
//           </LoginButtonsContainer>
//         )}
//       </Toolbar>
//     </StyledAppBar>
//   );
// }
