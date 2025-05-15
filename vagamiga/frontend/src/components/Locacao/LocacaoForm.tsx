import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

interface CondominioFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const CondominioForm: React.FC<CondominioFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
      nome: "",
      endereco: "",
      preco_por_hora: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required("Required"),
      endereco: Yup.string().required("Required"),
      preco_por_hora: Yup.number()
        .required("Required")
        .positive("Must be positive"),
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
          id="nome"
          name="nome"
          label="Nome do Condomínio"
          value={formik.values.nome}
          onChange={formik.handleChange}
          error={formik.touched.nome && Boolean(formik.errors.nome)}
          helperText={
            formik.touched.nome && typeof formik.errors.nome === "string"
              ? formik.errors.nome
              : undefined
          }
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="endereco"
          name="endereco"
          label="Endereço"
          multiline
          rows={4}
          value={formik.values.endereco}
          onChange={formik.handleChange}
          error={formik.touched.endereco && Boolean(formik.errors.endereco)}
          helperText={
            formik.touched.endereco &&
            typeof formik.errors.endereco === "string"
              ? formik.errors.endereco
              : undefined
          }
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="preco_por_hora"
          name="preco_por_hora"
          label="Preço por Hora (R$)"
          type="number"
          value={formik.values.preco_por_hora}
          onChange={formik.handleChange}
          error={
            formik.touched.preco_por_hora &&
            Boolean(formik.errors.preco_por_hora)
          }
          helperText={
            formik.touched.preco_por_hora &&
            typeof formik.errors.preco_por_hora === "string"
              ? formik.errors.preco_por_hora
              : undefined
          }
        />
      </Box>
      <Button color="primary" variant="contained" fullWidth type="submit">
        {initialValues ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default CondominioForm;
