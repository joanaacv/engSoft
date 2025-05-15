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
import { Condominio } from "../../api/condominios";

interface CondominioListProps {
  condominios: Condominio[];
  onEdit: (condominio: Condominio) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const CondominioList: React.FC<CondominioListProps> = ({
  condominios,
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
          {condominios.map((condominio) => (
            <TableRow key={condominio.id}>
              <TableCell>{condominio.nome}</TableCell>
              <TableCell>{condominio.endereco}</TableCell>
              <TableCell>R$ {condominio.preco_por_hora.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  onClick={() => onViewDetails(condominio.id)}
                >
                  Detalhes
                </Button>
                <Button color="secondary" onClick={() => onEdit(condominio)}>
                  Editar
                </Button>
                <Button color="primary" onClick={() => onDelete(condominio.id)}>
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

export default CondominioList;
