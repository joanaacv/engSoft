import {
  Apartment as CondominioIcon,
  Receipt as LocacaoIcon,
  Person as UserIcon,
  LocalParking as VagaIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const features = [
    {
      icon: <CondominioIcon fontSize="large" color="primary" />,
      title: "Gerenciamento de Condomínios",
      description:
        "Cadastre e gerencie todos os condomínios associados à plataforma.",
      action: "Ver Condomínios",
      path: "/condominios",
    },
    {
      icon: <VagaIcon fontSize="large" color="primary" />,
      title: "Controle de Vagas",
      description:
        "Registre e acompanhe todas as vagas de estacionamento disponíveis.",
      action: "Ver Vagas",
      path: "/vagas",
    },
    {
      icon: <LocacaoIcon fontSize="large" color="primary" />,
      title: "Sistema de Locações",
      description:
        "Gerencie as locações de vagas entre moradores do condomínio.",
      action: "Ver Locações",
      path: "/locacoes",
    },
    {
      icon: <UserIcon fontSize="large" color="primary" />,
      title: "Perfil Personalizado",
      description: "Acesse e edite suas informações pessoais e preferências.",
      action: "Meu Perfil",
      path: "/profile",
    },
  ];

  return (
    <Box>
      <Box
        bgcolor={theme.palette.primary.main}
        color="white"
        py={8}
        textAlign="center"
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Bem-vindo ao VAGAmiga
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            O sistema inteligente de gerenciamento de vagas de estacionamento
            para condomínios
          </Typography>
          {!user && (
            <Box mt={4}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/login")}
                style={{ marginRight: "16px" }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/register")}
              >
                Cadastre-se
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" style={{ padding: "40px 0" }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Nossos Recursos
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent style={{ flexGrow: 1, textAlign: "center" }}>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(feature.path)}
                  >
                    {feature.action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* {user && (
        <Box bgcolor={theme.palette.grey[100]} py={6} textAlign="center">
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
              Pronto para começar?
            </Typography>
            <Typography variant="body1">
              Acesse seu dashboard para gerenciar suas vagas e condomínios.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/dashboard")}
            >
              Acessar Dashboard
            </Button>
          </Container>
        </Box>
      )} */}
    </Box>
  );
};

export default HomePage;
