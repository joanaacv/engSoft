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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllReports,
  getMyReports,
  getReportsAsTenant,
  Report,
} from "../api/reports";
import { useAuth } from "../contexts/AuthContext";

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [viewAs, setViewAs] = useState<"locatario" | "locador">("locatario");
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchRentals();
    // eslint-disable-next-line
  }, [viewAs, user, search]);

  const fetchRentals = async () => {
    let data: Report[] = [];
    if (user?.is_admin) {
      data = await getAllReports();
      data = data.sort(
        (a, b) =>
          new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
      );
      if (search.trim()) {
        data = data.filter(
          (report) =>
            report.tenant.user.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            report.landlord.user.name
              .toLowerCase()
              .includes(search.toLowerCase())
        );
      }
    } else if (viewAs === "locatario") {
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
        <Typography variant="h4">
          {user?.is_admin ? "Locações" : "Minhas Locações"}
        </Typography>
        {!user?.is_admin && (
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
        )}
      </Box>

      {user?.is_admin && (
        <Box mb={2}>
          <TextField
            label="Buscar por usuário"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      )}

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
                  {viewAs === "locatario"
                    ? report.landlord.user.name
                    : report.tenant.user.name}
                </TableCell>
                <TableCell>
                  {new Date(report.start_date).toLocaleString()} -{" "}
                  {new Date(report.end_date).toLocaleString()}
                </TableCell>
                <TableCell>R$ {report.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {report.payment_confirmed ? "Pago" : "Pendente"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportsPage;
