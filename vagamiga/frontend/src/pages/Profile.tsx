import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateUser, User} from "../api/users";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    password: "", // só para alterar senha, opcional
    condominium: null,
    is_admin: false,
  });
  const [activeTab, setActiveTab] = useState(0);

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

      <Paper>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Informações" />
          <Tab label="Saldo" />
        </Tabs>

        <Box p={3}>
          {activeTab === 0 && (
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="first_name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Condomínio (ID)"
                  name="condominium"
                  type="number"
                  value={formData.condominium ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      condominium: e.target.value
                        ? Number(e.target.value)
                        : null,
                    })
                  }
                />
              </Box>
              <Box mb={2}>
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
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Salvar Alterações
              </Button>
            </form>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Saldo Disponível: R$ {user.balance?.toFixed(2) || "0.00"}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
