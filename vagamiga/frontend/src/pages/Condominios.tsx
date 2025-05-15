import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Condominio,
  createCondominio,
  deleteCondominio,
  getCondominios,
  updateCondominio,
} from "../api/condominios";
import CondominioForm from "../components/Condominio/CondominioForm";
import CondominioList from "../components/Condominio/CondominioList";
import { useAuth } from "../contexts/AuthContext";

const CondominiosPage: React.FC = () => {
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentCondominio, setCurrentCondominio] = useState<Condominio | null>(
    null
  );
  const { user } = useAuth();

  useEffect(() => {
    fetchCondominios();
  }, []);

  const fetchCondominios = async () => {
    const data = await getCondominios();
    setCondominios(data);
  };

  const handleSubmit = async (data: any) => {
    if (currentCondominio) {
      await updateCondominio(currentCondominio.id, data);
    } else {
      await createCondominio(data);
    }
    fetchCondominios();
    setOpenForm(false);
    setCurrentCondominio(null);
  };

  const handleEdit = (condominio: Condominio) => {
    setCurrentCondominio(condominio);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCondominio(id);
    fetchCondominios();
  };

  const handleViewDetails = (id: number) => {
    // Implement navigation to details page
    console.log("View details:", id);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Condomínios</Typography>
        {user?.user_type === "admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            Adicionar Condomínio
          </Button>
        )}
      </Box>

      <CondominioList
        condominios={condominios}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>
          {currentCondominio ? "Editar Condomínio" : "Adicionar Condomínio"}
        </DialogTitle>
        <DialogContent>
          <CondominioForm
            initialValues={currentCondominio || undefined}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CondominiosPage;
