import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

interface CondominiumFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const CondominiumForm: React.FC<CondominiumFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      adress: "",
      hourly_rate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      adress: Yup.string().required("Required"),
      hourly_rate: Yup.number()
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
          id="name"
          name="name"
          label="Nome do Condomínio"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={
            formik.touched.name && typeof formik.errors.name === "string"
              ? formik.errors.name
              : undefined
          }
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="adress"
          name="adress"
          label="Endereço"
          multiline
          rows={4}
          value={formik.values.adress}
          onChange={formik.handleChange}
          error={formik.touched.adress && Boolean(formik.errors.adress)}
          helperText={
            formik.touched.adress &&
            typeof formik.errors.adress === "string"
              ? formik.errors.adress
              : undefined
          }
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="hourly_rate"
          name="hourly_rate"
          label="Preço por Hora (R$)"
          type="number"
          value={formik.values.hourly_rate}
          onChange={formik.handleChange}
          error={
            formik.touched.hourly_rate &&
            Boolean(formik.errors.hourly_rate)
          }
          helperText={
            formik.touched.hourly_rate &&
            typeof formik.errors.hourly_rate === "string"
              ? formik.errors.hourly_rate
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

export default CondominiumForm;
