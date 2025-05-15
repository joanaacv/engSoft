import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getLocacoesComoLocador,
  getMinhasLocacoes,
  Locacao,
} from "../api/locacoes";
import { useAuth } from "../contexts/AuthContext";

const LocacoesPage: React.FC = () => {
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [viewAs, setViewAs] = useState<"locatario" | "locador">("locatario");
  const { user } = useAuth();

  useEffect(() => {
    fetchLocacoes();
  }, [viewAs]);

  const fetchLocacoes = async () => {
    let data: Locacao[];
    if (viewAs === "locatario") {
      data = await getMinhasLocacoes();
    } else {
      data = await getLocacoesComoLocador();
    }
    setLocacoes(data);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Minhas Locações</Typography>
        <Box>
          <Button
            variant={viewAs === "locatario" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setViewAs("locatario")}
            style={{ marginRight: "8px" }}
          >
            Como Locatário
          </Button>
          <Button
            variant={viewAs === "locador" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setViewAs("locador")}
          >
            Como Locador
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vaga</TableCell>
              <TableCell>
                {viewAs === "locatario" ? "Locador" : "Locatário"}
              </TableCell>
              <TableCell>Período</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locacoes.map((locacao) => (
              <TableRow key={locacao.id}>
                <TableCell>Vaga {locacao.vaga}</TableCell>
                <TableCell>
                  {viewAs === "locatario" ? locacao.locador : locacao.locatario}
                </TableCell>
                <TableCell>
                  {new Date(locacao.data_inicio).toLocaleString()} -{" "}
                  {new Date(locacao.data_fim).toLocaleString()}
                </TableCell>
                <TableCell>R$ {locacao.valor_total.toFixed(2)}</TableCell>
                <TableCell>{locacao.pago ? "Pago" : "Pendente"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LocacoesPage;
