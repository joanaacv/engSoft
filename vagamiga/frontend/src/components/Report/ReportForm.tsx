import { Box, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

interface ReportFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      start_date: "",
      end_date: "",
      amount: "",
      payment_confirmed: false,
    },
    validationSchema: Yup.object({
      start_date: Yup.date().required("Obrigatório"),
      end_date: Yup.date().required("Obrigatório"),
      amount: Yup.number().required("Obrigatório").positive("Deve ser positivo"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          id="start_date"
          name="start_date"
          label="Data de Início"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={formik.values.start_date}
          onChange={formik.handleChange}
          error={formik.touched.start_date && Boolean(formik.errors.start_date)}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          id="end_date"
          name="end_date"
          label="Data de Término"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={formik.values.end_date}
          onChange={formik.handleChange}
          error={formik.touched.end_date && Boolean(formik.errors.end_date)}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Valor (R$)"
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
        />
      </Box>

      <Box mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              id="payment_confirmed"
              name="payment_confirmed"
              checked={formik.values.payment_confirmed}
              onChange={formik.handleChange}
            />
          }
          label="Pagamento Confirmado"
        />
      </Box>


      <Button color="primary" variant="contained" fullWidth type="submit">
        {initialValues ? "Atualizar Relatório" : "Criar Relatório"}
      </Button>
    </form>
  );
};

export default ReportForm;