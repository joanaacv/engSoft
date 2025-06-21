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
  ParkingSpot,
  updateParkingSpot,
} from "../api/parkingspots";
import ParkingSpotCard from "../components/ParkingSpot/ParkingSpotCard";
import ParkingSpotForm from "../components/ParkingSpot/ParkingSpotForm";
import { useAuth } from "../contexts/AuthContext";

const mockParkingSpots: ParkingSpot[] = [
  {
    id: 1,
    spot_name: "A-101",
    condominium: 1,
    for_rent: true,
    owner: 2,
  },
  {
    id: 2,
    spot_name: "B-202",
    condominium: 1,
    for_rent: false,
    owner: 3,
  },
  {
    id: 3,
    spot_name: "C-303",
    condominium: 2,
    for_rent: true,
    owner: null,
  },
];

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
    const data = mockParkingSpots; // dados fake
    // const data = await getParkingSpots(); // chamada real
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

  const handleClaim = async (id: number) => {
    await updateParkingSpot(id, { for_rent: true });
    fetchSpots();
  };

  const filteredSpots = parkingSpots.filter((parkingSpot) =>
    parkingSpot.spot_name
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleUpdateStatus = async (id: number, free: boolean) => {
    await updateParkingSpot(id, { for_rent: free });
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
              onClaim={
                !spot.for_rent && spot.owner === user?.id
                  ? () => handleClaim(spot.id)
                  : undefined
              }
              onRent={() => handleUpdateStatus(spot.id, !spot.for_rent)}
              isOwner={spot.owner === user?.id}
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
