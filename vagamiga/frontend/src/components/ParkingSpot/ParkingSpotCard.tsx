import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ParkingSpot } from "../../api/parkingspots";
import PaymentModal from "./Payment";
interface ParkingSpotCardProps {
  spot: ParkingSpot;
  onChangeRent?: () => void;
  onClaim?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({
  spot: { id, spot_name, condominium, for_rent },
  onChangeRent,
  onClaim,
  onEdit,
  onDelete,
  isOwner,
}) => {
  const [openPayment, setOpenPayment] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    if (onDelete) {
      onDelete();
    }
  };

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
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenPayment(true)}
              >
                Alugar
              </Button>
              {openPayment && (
                <Dialog
                  open={openPayment}
                  onClose={() => setOpenPayment(false)}
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>Pagamento de Aluguel de Vaga</DialogTitle>
                  <DialogContent>
                    <PaymentModal
                      onSuccess={() => {
                        setOpenPayment(false);
                        onChangeRent();
                      }}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </>
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
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Excluir
                  </Button>
                  <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                    <DialogTitle>Confirmar exclusão</DialogTitle>
                    <DialogContent>
                      <Typography>
                        Tem certeza que deseja excluir a vaga <b>{spot_name}</b>
                        ?
                      </Typography>
                      <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                          onClick={handleDeleteCancel}
                          color="secondary"
                          style={{ marginRight: 8 }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleDeleteConfirm}
                          variant="contained"
                          color="error"
                        >
                          Excluir
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
export default ParkingSpotCard;
