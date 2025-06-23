import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { ParkingSpot } from "../../api/parkingspots";

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  onChangeRent?: () => void;
  onClaim?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({
  spot: { spot_name, condominium, for_rent },
  onChangeRent,
  onClaim,
  onEdit,
  onDelete,
  isOwner,
}) => {
  return (
    <Card sx={{ width: 300, height: 180 }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          Vaga {spot_name}
        </Typography>
        <Typography color="textSecondary">Condomínio: {condominium}</Typography>
        <Typography color="textSecondary">
          Status: {for_rent ? "Disponível para aluguel" : "Indisponível"}
        </Typography>

        <Box mt={2} display="flex" gap={1}>
          {onChangeRent && for_rent && !isOwner && (
            <Button variant="contained" color="primary" onClick={onChangeRent}>
              Alugar
            </Button>
          )}
          {onClaim && !for_rent && isOwner && (
            <Button variant="contained" color="secondary" onClick={onClaim}>
              Reivindicar
            </Button>
          )}
          {isOwner && (
            <>
              {onEdit && (
                <Button variant="contained" color="info" onClick={onEdit}>
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button variant="contained" color="error" onClick={onDelete}>
                  Excluir
                </Button>
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ParkingSpotCard;
