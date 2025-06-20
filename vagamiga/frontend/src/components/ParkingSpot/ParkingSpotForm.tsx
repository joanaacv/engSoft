import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";



interface ParkingSpotFormProps {
  initialValues?: {
    spot_name?: string;
    condominium?: number | string;
    for_rent?: boolean;
    owner?: number | null;
  };
  onSubmit: (values: {
    spot_name: string;
    condominium: number | string;
    for_rent: boolean;
    owner: number | null;
  }) => void;
}

const ParkingSpotForm: React.FC<ParkingSpotFormProps> = ({ initialValues, onSubmit }) => {
const formik = useFormik({
    initialValues: {
      spot_name: initialValues?.spot_name || "",
      condominium: initialValues?.condominium ?? "",
      for_rent: initialValues?.for_rent ?? false,
      owner: initialValues?.owner ?? null,
    },
    validationSchema: Yup.object({
      spot_name: Yup.string().required("Obrigatório"),
      condominium: Yup.number().required("Obrigatório"),
      for_rent: Yup.boolean(),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        condominium: Number(values.condominium),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={2}>
        <TextField
          fullWidth
          id="spot_name"
          name="spot_name"
          label="Nome da Vaga"
          value={formik.values.spot_name}
          onChange={formik.handleChange}
          error={formik.touched.spot_name && Boolean(formik.errors.spot_name)}
          helperText={
            formik.touched.spot_name && typeof formik.errors.spot_name === "string"
              ? formik.errors.spot_name
              : ""
          }
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          id="condominium"
          name="condominium"
          label="ID do Condomínio"
          type="number"
          value={formik.values.condominium}
          onChange={formik.handleChange}
          error={formik.touched.condominium && Boolean(formik.errors.condominium)}
          helperText={
            formik.touched.condominium &&
            typeof formik.errors.condominium === "string"
              ? formik.errors.condominium
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

export default ParkingSpotForm;
