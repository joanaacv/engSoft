import { Box, Button, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import React, { useEffect, useState } from "react";
import { getCondominium } from "../../api/condominiums";
import {
  getResidentByUserId,
  updateResidentBalance,
} from "../../api/residents";
import { useAuth } from "../../contexts/AuthContext";

interface PaymentProps {
  onSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [residentId, setResidentId] = useState<number | null>(null);

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) +
              1
          )
        )
      : 0;

  const total = days * dailyRate;

  const handlePayment = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      if (balance < total) {
        setError("Saldo insuficiente.");
        setLoading(false);
        return;
      }
      if (!startDate || !endDate) {
        setError("Selecione o período.");
        setLoading(false);
        return;
      }
      if (!residentId) {
        setError("Residente não encontrado.");
        setLoading(false);
        return;
      }

      const newBalance = balance - total;

      await updateResidentBalance(residentId, newBalance);

      const updatedResident = await getResidentByUserId(user.id);
      setBalance(Number(updatedResident?.balance) || 0);

      console.log(updateResidentBalance);
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
        console.log("Resident data:", resident);
        if (!resident) {
          setError("Residente não encontrado.");
          setLoading(false);
          return;
        }
        setBalance(Number(resident.balance) || 0);
        setResidentId(resident.id);

        console.log("Resident ID:", resident.user.id);
        console.log("User ID:", user.id);

        if (!user.condominium) {
          setError("Condomínio não encontrado.");
          setLoading(false);
          return;
        }
        const condo = await getCondominium(user.condominium);
        setDailyRate(Number(condo.hourly_rate) || 0);
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
      <Box sx={{ p: 3, mt: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  return (
    <Box sx={{ p: 1, mx: "auto" }}>
      <Typography>
        Saldo atual: <b>R$ {balance.toFixed(2)}</b>
      </Typography>
      <Typography>
        Valor do aluguel (por dia): <b>R$ {dailyRate.toFixed(2)}</b>
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <DatePicker
            label="Data de início"
            value={startDate}
            onChange={setStartDate}
            format="dd/MM/yyyy"
          />
          <DatePicker
            label="Data de término"
            value={endDate}
            onChange={setEndDate}
            format="dd/MM/yyyy"
            minDate={startDate ?? undefined}
          />
        </Box>
      </LocalizationProvider>
      <Typography sx={{ mt: 2 }}>
        Dias selecionados: <b>{days}</b>
      </Typography>
      <Typography>
        Total: <b>R$ {total.toFixed(2)}</b>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handlePayment}
        disabled={loading || balance < total || !startDate || !endDate}
        fullWidth
      >
        Pagar
      </Button>
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          Pagamento realizado com sucesso!
        </Typography>
      )}
    </Box>
  );
};

export default PaymentModal;
