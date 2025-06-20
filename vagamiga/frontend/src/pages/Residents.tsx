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
import { getResidents, getResidentById, Resident } from "../api/residents";
import { useAuth } from "../contexts/AuthContext";

const ResidentsPage: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    const data = await getResidents();
    setResidents(data);
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
            {residents.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell>{resident.balance}</TableCell>
                <TableCell>
                  <Box
                    component="div"
                    whiteSpace="normal"
                    maxWidth="500px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {resident.user.name}
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

export default ResidentsPage;
