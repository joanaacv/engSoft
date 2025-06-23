import {
  Apartment,
  Assessment,
  LocalParking,
  Person,
  Receipt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, error } = useAuth();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const featuresAdmin = [
    {
      icon: <Person fontSize="large" color="primary" />,
      title: "Cadastro de Novos Usuários",
      description: "Adicione novos moradores.",
      action: "Acesse",
      path: "/registro",
    },
    {
      icon: <LocalParking fontSize="large" color="primary" />,
      title: "Controle de Vagas",
      description:
        "Registre e acompanhe todas as vagas de estacionamento disponíveis.",
      action: "Ver Vagas",
      path: "/vagas",
    },
    {
      icon: <Receipt fontSize="large" color="primary" />,

      title: "Relatórios",
      description: "Visualize e gere relatórios sobre o uso de vagas.",
      action: "Acesse",
      path: "/relatorios",
    },
    {
      icon: <Apartment fontSize="large" color="primary" />,
      title: "Gerencie seu Condomínio",
      description: "Visualize e edite as informações do seu condomínio.",
      action: "Ver Condomínio",
      path: "/condominio",
    },
  ];

  const featuresUser = [
    {
      icon: <LocalParking fontSize="large" color="primary" />,
      title: "Vagas no seu Condomínio",
      description: "Acompanhe todas as vagas de estacionamento disponíveis.",
      action: "Ver Vagas",
      path: "/vagas",
    },
    {
      icon: <Receipt fontSize="large" color="primary" />,
      title: "Sistema de Locações",
      description:
        "Gerencie as locações de vagas entre moradores do condomínio.",
      action: "Acesse",
      path: "/relatorios",
    },
    {
      icon: <Assessment fontSize="large" color="primary" />,

      title: "Meus relatórios",
      description: "Visualize e gere relatórios sobre o uso de suas vagas.",
      action: "Acesse",
      path: "/relatorios",
    },
    {
      icon: <Person fontSize="large" color="primary" />,
      title: "Minha Conta",
      description: "Visualize e edite suas informações pessoais.",
      action: "Acesse",
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
            para o seu condomínio
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {user ? (
            <Grid container marginTop={8} spacing={4}>
              {(user.is_admin ? featuresAdmin : featuresUser).map((feature) => (
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
          ) : (
            <Container maxWidth="xs">
              <Box
                mt={8}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography component="h1" variant="h5">
                  Encontre sua vaga ideal!
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  mt={3}
                  width="100%"
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && (
                    <Typography color="error" variant="body2">
                      {typeof error === "string" ? error : "Login failed"}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "16px" }}
                  >
                    Entrar
                  </Button>
                </Box>
              </Box>
            </Container>
          )}
        </Typography>
      </Container>
    </Box>
  );
};

export default HomePage;
