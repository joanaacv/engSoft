import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  claimVaga,
  createVaga,
  deleteVaga,
  getVagas,
  updateVaga,
  Vaga,
} from "../api/vagas";
import VagaCard from "../components/Vaga/VagaCard";
import VagaForm from "../components/Vaga/VagaForm";
import { useAuth } from "../contexts/AuthContext";

const VagasPage: React.FC = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentVaga, setCurrentVaga] = useState<Vaga | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    const data = await getVagas();
    setVagas(data);
  };

  const handleSubmit = async (data: any) => {
    if (currentVaga) {
      await updateVaga(currentVaga.id, data);
    } else {
      await createVaga(data);
    }
    fetchVagas();
    setOpenForm(false);
    setCurrentVaga(null);
  };

  const handleClaim = async (id: number) => {
    await claimVaga(id);
    fetchVagas();
  };

  const handleEdit = (vaga: Vaga) => {
    setCurrentVaga(vaga);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteVaga(id);
    fetchVagas();
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Vagas</Typography>
        {user?.user_type === "admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            Adicionar Vaga
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {vagas.map((vaga) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vaga.id}>
            <VagaCard
              vaga={vaga}
              onClaim={
                vaga.proprietario ? undefined : () => handleClaim(vaga.id)
              }
              onAlugar={() => console.log("Alugar vaga", vaga.id)}
              isOwner={vaga.proprietario === user?.id}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>
          {currentVaga ? "Editar Vaga" : "Adicionar Vaga"}
        </DialogTitle>
        <DialogContent>
          <VagaForm
            initialValues={currentVaga || undefined}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VagasPage;
