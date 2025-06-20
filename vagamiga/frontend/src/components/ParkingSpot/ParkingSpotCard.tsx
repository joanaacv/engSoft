import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { ParkingSpot } from "../../api/parkingspots";

interface ParkingSpotCardProps {
  spot: ParkingSpot;
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({ spot }) => {
  return (
    <Card>
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
        {/* 
        <Box mt={2}>
          {onAlugar && !isOwner && parkingspot.disponivel && (
            <Button variant="contained" color="primary" onClick={onAlugar}>
              Alugar
            </Button>
          )}
          {onClaim && parkingspot.proprietario && isOwner && (
            <Button variant="contained" color="secondary" onClick={onClaim}>
              Reivindicar
            </Button>
          )}
        </Box>
        */}
      </CardContent>
    </Card>
  );
};

export default ParkingSpotCard;
