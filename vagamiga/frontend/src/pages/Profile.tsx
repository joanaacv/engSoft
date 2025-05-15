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
import { updateCurrentUser, User, withdrawBalance } from "../api/users";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    pix_key: "",
  });
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || "",
        pix_key: user.pix_key || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCurrentUser(formData);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    await withdrawBalance(Number(withdrawAmount), formData.pix_key || "");
    setWithdrawAmount("");
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
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Sobrenome"
                  name="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
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
                  label="Telefone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Chave PIX"
                  name="pix_key"
                  value={formData.pix_key}
                  onChange={(e) =>
                    setFormData({ ...formData, pix_key: e.target.value })
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

              <form onSubmit={handleWithdraw}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Valor para resgate"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Chave PIX"
                    value={formData.pix_key}
                    onChange={(e) =>
                      setFormData({ ...formData, pix_key: e.target.value })
                    }
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!withdrawAmount || !formData.pix_key}
                >
                  Resgatar via PIX
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
