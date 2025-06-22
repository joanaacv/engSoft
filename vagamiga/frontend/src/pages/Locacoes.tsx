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
import { getReportsAsTenant, getReportsAsLandlord, Report} from "../api/reports";
import { useAuth } from "../contexts/AuthContext";

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [viewAs, setViewAs] = useState<"locatario" | "locador">("locatario");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLocacoes(user.id);
    }
  }, [viewAs, user]);

  const fetchLocacoes = async (userId: number) => {
    let data: Report[] | null;

    if (viewAs === "locatario") {
      data = await getReportsAsLandlord(userId);
    } else {
      data = await getReportsAsTenant(userId);
    }

    if (data){
      setReports(data);
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>Relatórios</Typography>
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
              <TableCell>ID Locação</TableCell>
              <TableCell>Nome da Vaga</TableCell>
              <TableCell>Locatario</TableCell>
              <TableCell>Locador</TableCell>
              <TableCell>Data Inicio</TableCell>
              <TableCell>Data Fim</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Confirmação de Pagamento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(reports) &&
              reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.spot?.spot_name || "N/A"}</TableCell>
                  <TableCell>{report.tenant?.user?.name || "N/A"}</TableCell>
                  <TableCell>{report.landlord?.user?.name || "N/A"}</TableCell>
                  <TableCell>{report.start_date}</TableCell>
                  <TableCell>{report.end_date}</TableCell>
                  <TableCell>{report.amount}</TableCell>
                  <TableCell>{report.payment_confirmed ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportsPage;
