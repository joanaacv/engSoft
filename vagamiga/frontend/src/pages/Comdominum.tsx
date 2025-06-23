import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Condominium,
  getCondominium,
  updateCondominium,
} from "../api/condominiums";
import { useAuth } from "../contexts/AuthContext";

const CondominiumPage: React.FC = () => {
  const { user } = useAuth();
  const [condominium, setCondominium] = useState<Condominium | null>(null);
  const [editing, setEditing] = useState(false);
  const [hourlyRate, setHourlyRate] = useState<string>("");

  useEffect(() => {
    if (user?.condominium) {
      getCondominium(user.condominium).then((data) => {
        setCondominium(data);
        setHourlyRate(data.hourly_rate.toString());
      });
    }
  }, [user]);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    if (condominium && hourlyRate) {
      const updated = await updateCondominium(condominium.id, {
        hourly_rate: parseFloat(hourlyRate),
      });
      setCondominium(updated);
      setEditing(false);
    }
  };

  if (!condominium) return null;

  return (
    <>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Informações do Condomínio
        </Typography>

        <Paper>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Bem-vindo ao <b>{condominium.name}</b>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Aqui você pode gerenciar as informações do seu condomínio.
            </Typography>
            <Box mt={2}>
              <Typography variant="h5" gutterBottom>
                Endereço:
              </Typography>
              <Typography variant="body1">{condominium.address}</Typography>
            </Box>
            <Box mt={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h5" gutterBottom gap={2}>
                  Preço por Hora:
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                  {editing ? (
                    <TextField
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      size="small"
                      sx={{ width: 120, height: 40 }}
                    />
                  ) : (
                    <Typography
                      variant="h5"
                      color="success.main"
                      sx={{
                        width: 120,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      R$ {condominium.hourly_rate.toFixed(2)}
                    </Typography>
                  )}
                  {user.is_admin &&
                    (editing ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSave}
                      >
                        Salvar
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={handleEdit}
                      >
                        Editar
                      </Button>
                    ))}
                </Box>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default CondominiumPage;
