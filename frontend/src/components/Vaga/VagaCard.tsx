import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Vaga } from "../../api/vagas";

interface VagaCardProps {
  vaga: Vaga;
  onAlugar?: () => void;
  onClaim?: () => void;
  isOwner?: boolean;
}

const VagaCard: React.FC<VagaCardProps> = ({
  vaga,
  onAlugar,
  onClaim,
  isOwner,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          Vaga {vaga.numero}
        </Typography>
        <Typography color="textSecondary">
          Condomínio: {vaga.condominio}
        </Typography>
        <Typography color="textSecondary">
          Status: {vaga.disponivel ? "Disponível" : "Ocupada"}
        </Typography>
        <Box mt={2}>
          {onAlugar && !isOwner && vaga.disponivel && (
            <Button variant="contained" color="primary" onClick={onAlugar}>
              Alugar
            </Button>
          )}
          {onClaim && !vaga.proprietario && (
            <Button variant="contained" color="secondary" onClick={onClaim}>
              Reivindicar
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VagaCard;
