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
  createParkingSpot,
  deleteParkingSpot,
  getParkingSpots,
  updateParkingSpot,
  ParkingSpot,
} from "../api/parkingspots";
import ParkingSpotCard from "../components/ParkingSpot/ParkingSpotCard";
import ParkingSpotForm from "../components/ParkingSpot/ParkingSpotForm";
import { useAuth } from "../contexts/AuthContext";

const ParkingSpotPage: React.FC = () => {
  const [parkingspots, setVagas] = useState<ParkingSpot[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentparkingspot, setCurrentVaga] = useState<ParkingSpot | null>(null);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [locador, setLocador] = useState("");

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    const data = await getParkingSpots();
    setVagas(data);
  };

  const handleSubmit = async (data: any) => {
    if (currentparkingspot) {
      await updateParkingSpot(currentparkingspot.id, data);
    } else {
      await createParkingSpot(data);
    }
    fetchVagas();
    setOpenForm(false);
    setCurrentVaga(null);
  };

  const handleEdit = (vaga: ParkingSpot) => {
    setCurrentVaga(vaga);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteParkingSpot(id);
    fetchVagas();
  };

  const filteredVagas = parkingspots.filter((parkingspot) =>
    parkingspot.spot_name.toString().toLowerCase().includes(search)
  );

  const [confirmClaimId, setConfirmClaimId] = useState<number | null>(null);

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

[        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>
            {currentparkingspot ? "Editar Vaga" : "Adicionar Vaga"}
          </DialogTitle>
          <DialogContent>
            <ParkingSpotForm
              initialValues={currentparkingspot || undefined}
              onSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default ParkingSpotPage;
