import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { ParkingSpot } from "../../api/parkingspots";

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  onRent?: () => void;
  onClaim?: () => void;
  isOwner?: boolean;
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({
  spot,
  onRent,
  onClaim,
  isOwner,
}) => {
  return (
    <Card sx={{ width: 300, height: 180 }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          Vaga {spot.spot_name}
        </Typography>
        <Typography color="textSecondary">
          Condomínio: {spot.condominium}
        </Typography>
        <Typography color="textSecondary">
          Status: {spot.for_rent ? "Disponível para aluguel" : "Indisponível"}
        </Typography>

        <Box mt={2}>
          {onRent && !spot.owner && !isOwner && (
            <Button variant="contained" color="primary" onClick={onRent}>
              Alugar
            </Button>
          )}
          {onClaim && spot.owner && isOwner && (
            <Button variant="contained" color="secondary" onClick={onClaim}>
              Reivindicar
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParkingSpotCard;
