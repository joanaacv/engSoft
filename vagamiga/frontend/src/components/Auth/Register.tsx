import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../api/users";
import { useAuth } from "../../contexts/AuthContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { user, register, error } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (formData.password !== formData.repeatPassword) {
      setLocalError("As senhas não coincidem.");
      return;
    }
    try {
      const data: CreateUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await register(data);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return user.is_admin ? (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Registrar novo morador
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3} width="100%">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Repetir Senha"
            name="repeatPassword"
            type="password"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {(localError || error) && (
            <Typography color="error" variant="body2">
              {localError ||
                (typeof error === "string" ? error : "Registration failed")}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Criar conta
          </Button>
        </Box>
      </Box>
    </Container>
  ) : (
    <Container maxWidth="xs">
      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="#fff3e0"
        borderRadius={3}
        boxShadow={4}
        p={5}
      >
        <Typography
          component="h1"
          variant="h4"
          color="error"
          fontWeight="bold"
          gutterBottom
        >
          Acesso restrito
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          mt={2}
          align="center"
          fontWeight="medium"
        >
          Apenas{" "}
          <span style={{ color: "#d32f2f", fontWeight: 600 }}>
            administradores
          </span>{" "}
          podem registrar novos usuários.
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
