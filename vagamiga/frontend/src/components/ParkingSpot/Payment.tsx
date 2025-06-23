import { Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCondominium } from "../../api/condominiums";
import { getResidentByUserId } from "../../api/residents";
import { useAuth } from "../../contexts/AuthContext";

interface PaymentProps {
  onSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const resident = await getResidentByUserId(user.id);
        if (!resident) {
          setError("Residente não encontrado.");
          setLoading(false);
          return;
        }
        setBalance(resident.balance);

        if (!user.condominium) {
          setError("Condomínio não encontrado.");
          setLoading(false);
          return;
        }
        const condo = await getCondominium(user.condominium);
        setHourlyRate(condo.hourly_rate);
      } catch (err) {
        setError("Erro ao buscar dados.");
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handlePayment = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      if (balance < hourlyRate) {
        setError("Saldo insuficiente.");
        setLoading(false);
        return;
      }
      // Chame a API para atualizar o saldo do residente
      // Aqui, supondo que existe um endpoint PATCH /resident/:id/ para atualizar o saldo
      const resident = await getResidentByUserId(user.id);
      if (!resident) {
        setError("Residente não encontrado.");
        setLoading(false);
        return;
      }
      const response = await fetch(
        `http://localhost:8000/api/resident/${resident.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ balance: balance - hourlyRate }),
        }
      );
      if (!response.ok) {
        setError("Erro ao processar pagamento.");
        setLoading(false);
        return;
      }
      setBalance(balance - hourlyRate);
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Erro ao processar pagamento.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const resident = await getResidentByUserId(user.id);
        if (!resident) {
          setError("Residente não encontrado.");
          setLoading(false);
          return;
        }
        setBalance(Number(resident.balance) || 0);

        if (!user.condominium) {
          setError("Condomínio não encontrado.");
          setLoading(false);
          return;
        }
        const condo = await getCondominium(user.condominium);
        setHourlyRate(Number(condo.hourly_rate) || 0);
      } catch (err) {
        setError("Erro ao buscar dados.");
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) return <Typography>Carregando...</Typography>;
  if (error)
    return (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );

  return (
    <Paper sx={{ p: 3, mt: 2, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Pagamento de Aluguel de Vaga
      </Typography>
      <Typography>
        Saldo atual: <b>R$ {balance.toFixed(2)}</b>
      </Typography>
      <Typography>
        Valor do aluguel (1 hora): <b>R$ {hourlyRate.toFixed(2)}</b>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handlePayment}
        disabled={loading || balance < hourlyRate}
        fullWidth
      >
        Pagar
      </Button>
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          Pagamento realizado com sucesso!
        </Typography>
      )}
    </Paper>
  );
};

export default PaymentModal;
