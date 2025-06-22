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
import { getReportsAsTenant, getMyReports, Report} from "../api/reports";
import { useAuth } from "../contexts/AuthContext";

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [viewAs, setViewAs] = useState<"locatario" | "locador">("locatario");
  const { user } = useAuth();

  useEffect(() => {
    fetchLocacoes();
  }, [viewAs]);

  const fetchLocacoes = async () => {
    let data: Report[];
    if (viewAs === "locatario") {
      data = await getMyReports();
    } else {
      data = await getReportsAsTenant();
    }
    setReports(data);
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
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>Vaga {report.spot.spot_name}</TableCell>
                <TableCell>
                  {viewAs === "locatario" ? report.landlord.user.name : report.tenant.user.name}
                </TableCell>
                <TableCell>
                  {new Date(report.start_date).toLocaleString()} -{" "}
                  {new Date(report.end_date).toLocaleString()}
                </TableCell>
                <TableCell>R$ {report.amount.toFixed(2)}</TableCell>
                <TableCell>{report.payment_confirmed ? "Pago" : "Pendente"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportsPage;
