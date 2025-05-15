import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
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
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [locador, setLocador] = useState("");

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
    await updateVaga(id, { disponivel: true });
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

  const filteredVagas = vagas.filter((vaga) =>
    vaga.numero.toString().toLowerCase().includes(search)
  );

  const [confirmClaimId, setConfirmClaimId] = useState<number | null>(null);

  const handleUpdateStatus = async (id: number, disponivel: boolean) => {
    await updateVaga(id, { disponivel: disponivel });
    fetchVagas();
  };

  return (
    <>
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

        <Box mb={3}>
          <TextField
            label="Pesquisar vagas"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredVagas.map((vaga) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vaga.id}>
              <VagaCard
                vaga={vaga}
                onClaim={
                  !vaga.disponivel && vaga.proprietario === user?.id
                    ? () => handleClaim(vaga.id)
                    : undefined
                }
                onAlugar={() => handleUpdateStatus(vaga.id, !vaga.disponivel)}
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
    </>
  );
};

export default VagasPage;
