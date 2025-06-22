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
  Condominium,
  createCondominium,
  deleteCondominium,
  getCondominiums,
  updateCondominium,
} from "../api/condominiums";
import CondominiumForm from "../components/Condominium/CondominiumForm";
import CondominiumList from "../components/Condominium/CondominiumList";
import { useAuth } from "../contexts/AuthContext";

const CondominiumsPage: React.FC = () => {
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentCondominium, setCurrentCondominium] = useState<Condominium | null>(
    null
  );
  const { user } = useAuth();

  useEffect(() => {
    fetchCondominiums();
  }, []);

  const fetchCondominiums = async () => {
    const data = await getCondominiums();
    setCondominiums(data);
  };

  const handleSubmit = async (data: any) => {
    if (currentCondominium) {
      await updateCondominium(currentCondominium.id, data);
    } else {
      await createCondominium(data);
    }
    fetchCondominiums();
    setOpenForm(false);
    setCurrentCondominium(null);
  };

  const handleEdit = (condominium: Condominium) => {
    setCurrentCondominium(condominium);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCondominium(id);
    fetchCondominiums();
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

      <CondominiumList
        condominiums={condominiums}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>
          {currentCondominium ? "Editar Condomínio" : "Adicionar Condomínio"}
        </DialogTitle>
        <DialogContent>
          <CondominiumForm
            initialValues={currentCondominium || undefined}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CondominiumsPage;
