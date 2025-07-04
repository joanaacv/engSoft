import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createResident } from "../api/residents";
import { createUser, getUsers, updateUser, UserResponse } from "../api/users";
import { useAuth } from "../contexts/AuthContext";

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    is_admin: false,
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!editingUser && formData.password !== formData.repeatPassword) {
      setLocalError("As senhas não coincidem.");
      return;
    }

    try {
      if (editingUser) {
        const updated = await updateUser(editingUser.id, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          is_admin: formData.is_admin,
        });
        setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
      } else {
        const created = await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          condominium: 1,
          is_admin: formData.is_admin,
        });

        if (!created.is_admin) {
          await createResident({
            balance: 0,
            user: created,
          });
        }
        setUsers([...users, created]);
      }
      handleClose();
    } catch (err) {
      setLocalError("Erro ao salvar usuário.");
      console.error(err);
    }
  };
  // Buscar usuários do condomínio
  useEffect(() => {
    if (!user) return;
    getUsers().then((data) => {
      setUsers(data.filter((u) => u.condominium === user.condominium));
    });
  }, [user]);

  const handleOpen = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      is_admin: false,
    });
    setOpen(true);
  };

  const handleEdit = (u: UserResponse) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      password: "",
      repeatPassword: "",
      is_admin: u.is_admin,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  if (!user) return null;

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Usuários do Condomínio</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Registrar Usuário
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Administrador</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((u) => u.id !== user.id)
              .map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.is_admin ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(u)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de registro/edição */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingUser ? "Editar Usuário" : "Registrar Usuário"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Nome"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Senha"
              fullWidth
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editingUser}
              helperText={editingUser ? "Deixe em branco para não alterar" : ""}
            />
            {!editingUser && (
              <TextField
                margin="dense"
                label="Repetir Senha"
                fullWidth
                type="password"
                value={formData.repeatPassword || ""}
                onChange={(e) =>
                  setFormData({ ...formData, repeatPassword: e.target.value })
                }
                required
              />
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_admin}
                  onChange={(e) =>
                    setFormData({ ...formData, is_admin: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Administrador"
            />
            {localError && (
              <Typography color="error" variant="body2">
                {localError}
              </Typography>
            )}
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClose}
                color="secondary"
                style={{ marginRight: 8 }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editingUser ? "Salvar" : "Registrar"}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {/* Modal de confirmação de exclusão */}
    </Box>
  );
};

export default UsersPage;
