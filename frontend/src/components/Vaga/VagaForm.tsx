import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

interface VagaFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const VagaForm: React.FC<VagaFormProps> = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      numero: "",
      condominio: "",
    },
    validationSchema: Yup.object({
      numero: Yup.string().required("Obrigatório"),
      condominio: Yup.number().required("Obrigatório"),
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
          id="numero"
          name="numero"
          label="Número da Vaga"
          value={formik.values.numero}
          onChange={formik.handleChange}
          error={formik.touched.numero && Boolean(formik.errors.numero)}
          helperText={
            formik.touched.numero && typeof formik.errors.numero === "string"
              ? formik.errors.numero
              : ""
          }
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="condominio"
          name="condominio"
          label="ID do Condomínio"
          type="number"
          value={formik.values.condominio}
          onChange={formik.handleChange}
          error={formik.touched.condominio && Boolean(formik.errors.condominio)}
          helperText={
            formik.touched.condominio &&
            typeof formik.errors.condominio === "string"
              ? formik.errors.condominio
              : ""
          }
        />
      </Box>
      <Button color="primary" variant="contained" fullWidth type="submit">
        {initialValues ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default VagaForm;
