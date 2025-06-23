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
  getReportsAsLandlord,
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
    if (user.is_admin) {
      fetchLAdminReports(user.id);
    } else {
      fetchReports(user.id, viewAs);
    }
  }, [viewAs, user]);

  const fetchLAdminReports = async (userId: number) => {
    let data: Report[] | null;

    if (viewAs === "locatario") {
      data = await getReportsAsLandlord(userId);
    } else {
      data = await getReportsAsTenant(userId);
    }

    if (data) {
      setReports(data);
    }
  };

  const fetchReports = async (
    userId: number,
    tipo?: "locatario" | "locador"
  ) => {
    let data: Report[] | null;
    const tipoView = tipo || viewAs;
    if (tipoView === "locatario") {
      data = await getReportsAsTenant(userId);
      data = data?.filter((report) => report.tenant?.user?.id === userId) || [];
    } else {
      data = await getReportsAsLandlord(userId);
      data =
        data?.filter((report) => report.landlord?.user?.id === userId) || [];
    }

    setReports(data || []);
  };

  const filteredReports = reports.filter((report) => {
    const tenantName = report.tenant?.user?.name.toLowerCase() || "";
    const landlordName = report.landlord?.user?.name.toLowerCase() || "";
    const spotName = report.spot?.spot_name.toLowerCase() || "";
    const searchTerm = search.toLowerCase();

    return (
      tenantName.includes(searchTerm) ||
      landlordName.includes(searchTerm) ||
      spotName.includes(searchTerm)
    );
  });

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          Relatórios
        </Typography>
        {!user?.is_admin && (
          <Box>
            <Button
              variant={viewAs === "locatario" ? "contained" : "outlined"}
              color="primary"
              onClick={async () => {
                setViewAs("locatario");
                if (user) await fetchReports(user.id, "locatario");
              }}
              style={{ marginRight: "8px" }}
            >
              Locatário
            </Button>
            <Button
              variant={viewAs === "locador" ? "contained" : "outlined"}
              color="primary"
              onClick={async () => {
                setViewAs("locador");
                if (user) await fetchReports(user.id, "locador");
              }}
            >
              Locador
            </Button>
          </Box>
        )}
      </Box>

      <Box mb={3}>
        <TextField
          label="Pesquisar usuários ou vaga"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
            {Array.isArray(filteredReports) &&
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.spot?.spot_name || "N/A"}</TableCell>
                  <TableCell>{report.tenant?.user?.name || "N/A"}</TableCell>
                  <TableCell>{report.landlord?.user?.name || "N/A"}</TableCell>
                  <TableCell>{report.start_date}</TableCell>
                  <TableCell>{report.end_date}</TableCell>
                  <TableCell>{report.amount}</TableCell>
                  <TableCell>
                    {report.payment_confirmed ? "Sim" : "Não"}
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
