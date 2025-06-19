import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Condominium } from "../../api/condominiums";

interface CondominioListProps {
  condominiums: Condominium[];
  onEdit: (condominio: Condominium) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const CondominiumList: React.FC<CondominioListProps> = ({
  condominiums,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Preço por Hora</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {condominiums.map((condominium) => (
            <TableRow key={condominium.id}>
              <TableCell>{condominium.name}</TableCell>
              <TableCell>{condominium.adress}</TableCell>
              <TableCell>R$ {condominium.hourly_rate.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => onViewDetails(condominium.id)}
                >
                  Detalhes
                </Button>
                <Button color="secondary" onClick={() => onEdit(condominium)}>
                  Editar
                </Button>
                <Button color="primary" onClick={() => onDelete(condominium.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CondominiumList;
