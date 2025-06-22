import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createParkingSpot,
  deleteParkingSpot,
  getParkingSpots,
  ParkingSpot,
  updateParkingSpot,
} from "../api/parkingspots";
import ParkingSpotCard from "../components/ParkingSpot/ParkingSpotCard";
import ParkingSpotForm from "../components/ParkingSpot/ParkingSpotForm";
import { useAuth } from "../contexts/AuthContext";

const ParkingSpotPage: React.FC = () => {
  const [parkingSpots, setSpots] = useState<ParkingSpot[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentParkingSpot, setCurrentSpot] = useState<ParkingSpot | null>(
    null
  );
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [locador, setLocador] = useState("");

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    const data = await getParkingSpots();
    setSpots(data);
  };

  const handleSubmit = async (data: any) => {
    if (currentParkingSpot) {
      await updateParkingSpot(currentParkingSpot.id, data);
    } else {
      await createParkingSpot(data);
    }
    fetchSpots();
    setOpenForm(false);
    setCurrentSpot(null);
  };

  const handleEdit = (spot: ParkingSpot) => {
    setCurrentSpot(spot);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteParkingSpot(id);
    fetchSpots();
  };

  const handleRentClaim = async (id: number) => {
    await updateParkingSpot(id, { for_rent: true });
    fetchSpots();
  };

  const filteredSpots = parkingSpots.filter((parkingSpot) =>
    parkingSpot.spot_name
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleRentUpdateStatus = async (id: number) => {
    await updateParkingSpot(id, { for_rent: false });
    fetchSpots();
  };

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
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filteredSpots.map((spot) => (
            <ParkingSpotCard
              key={spot.id}
              spot={spot}
              onClaim={() => handleRentClaim(spot.id)}
              onChangeRent={() => handleRentUpdateStatus(spot.id)}
              isOwner={spot.owner === user.id}
            />
          ))}
        </Box>

        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>
            {currentParkingSpot ? "Editar Vaga" : "Adicionar Vaga"}
          </DialogTitle>
          <DialogContent>
            <ParkingSpotForm
              initialValues={currentParkingSpot || undefined}
              onSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default ParkingSpotPage;
