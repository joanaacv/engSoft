import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
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
  const { register, error } = useAuth();
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

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Registrar
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
          <Box mt={2}>
            <Link href="/login" variant="body2">
              Já possui uma conta? Entre agora.
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
