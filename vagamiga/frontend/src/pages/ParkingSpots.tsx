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
  const [viewAs, setViewAs] = useState<"locatario" | "locador">("locatario");
  const [search, setSearch] = useState("");
  const { user } = useAuth();

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

  const handleRentUpdateStatus = async (id: number) => {
    await updateParkingSpot(id, { for_rent: false });
    fetchSpots();
  };

  const filteredSpots = parkingSpots.filter((parkingSpot) => {
    const matchesSearch = parkingSpot.spot_name
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase());

    if (user?.is_admin) {
      return matchesSearch;
    }

    if (viewAs === "locatario") {
      return (
        matchesSearch &&
        parkingSpot.for_rent === true &&
        parkingSpot.owner !== user?.id
      );
    }

    if (viewAs === "locador") {
      return matchesSearch && parkingSpot.owner === user?.id;
    }

    return false;
  });

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
          {!user?.is_admin && (
            <Box>
              <Button
                variant={viewAs === "locatario" ? "contained" : "outlined"}
                color="primary"
                onClick={async () => {
                  setViewAs("locatario");
                  if (user.id === user?.id) {
                    await fetchSpots();
                  }
                }}
                style={{ marginRight: "8px" }}
              >
                Como Locatário
              </Button>
              <Button
                variant={viewAs === "locador" ? "contained" : "outlined"}
                color="primary"
                onClick={async () => {
                  setViewAs("locador");
                }}
              >
                Como Locador
              </Button>
            </Box>
          )}
          {user?.is_admin && (
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
                !user?.is_admin ? () => handleRentClaim(spot.id) : undefined
              }
              onChangeRent={
                !user?.is_admin
                  ? () => handleRentUpdateStatus(spot.id)
                  : undefined
              }
              onEdit={
                user?.is_admin || spot.owner === user?.id
                  ? () => handleEdit(spot)
                  : undefined
              }
              onDelete={
                user?.is_admin || spot.owner === user?.id
                  ? () => handleDelete(spot.id)
                  : undefined
              }
              isOwner={user?.is_admin ? true : spot.owner === user?.id}
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
