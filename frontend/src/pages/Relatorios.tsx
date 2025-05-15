import {
  Box,
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
import { getRelatorios, Relatorio } from "../api/relatorios";
import { useAuth } from "../contexts/AuthContext";

const RelatoriosPage: React.FC = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchRelatorios();
  }, []);

  const fetchRelatorios = async () => {
    const data = await getRelatorios();
    setRelatorios(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Locação</TableCell>
              <TableCell>Data de Geração</TableCell>
              <TableCell>Conteúdo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {relatorios.map((relatorio) => (
              <TableRow key={relatorio.id}>
                <TableCell>{relatorio.locacao}</TableCell>
                <TableCell>
                  {new Date(relatorio.data_geracao).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Box
                    component="div"
                    whiteSpace="normal"
                    maxWidth="500px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {relatorio.conteudo}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RelatoriosPage;
