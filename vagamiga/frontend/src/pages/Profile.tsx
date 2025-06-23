import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getResidentByUserId } from "../api/residents";
import { updateUser, UserResponse } from "../api/users";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<UserResponse>>({
    name: "",
    email: "",
    password: "",
    condominium: null,
    is_admin: false,
  });
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        condominium: user.condominium,
        is_admin: user.is_admin,
      });
    }

    getResidentByUserId(user.id).then((resident) => {
      if (resident) {
        setBalance(resident.balance);
      }
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(user!.id, formData);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar perfil.");
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>
      <Paper elevation={3}>
        <Box p={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="first_name"
                  value={formData.name}
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Senha (deixe vazio para não alterar)"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Box my={3}>
              <Divider />
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Condomínio (ID)
                </Typography>
                <Typography variant="body1">
                  {formData.condominium ?? ""}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Saldo Disponível
                </Typography>
                <Typography variant="body1">R$ {balance}</Typography>
              </Grid>
            </Grid>

            <Box mt={4} textAlign="center" marginTop={12}>
              <Button type="submit" variant="contained" color="primary">
                Salvar Alterações
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
