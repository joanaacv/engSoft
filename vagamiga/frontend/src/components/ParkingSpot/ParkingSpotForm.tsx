import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { getResidents, Resident } from "../../api/residents"; // ajuste o caminho



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
      owner: Yup.number().nullable().required("Obrigatório"), // se quiser que o campo seja obrigatório
      for_rent: Yup.boolean(),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        condominium: Number(1),
        owner: values.owner,
      });
    },
  });
const [residents, setResidents] = useState<Resident[]>([]);
useEffect(() => {
  getResidents().then(setResidents).catch(console.error);
}, []);

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
        <FormControl fullWidth>
          <InputLabel id="owner-label">Morador responsável</InputLabel>
          <Select
            labelId="owner-label"
            id="owner"
            name="owner"
            value={formik.values.owner ?? ""}
            onChange={formik.handleChange}
            error={formik.touched.owner && Boolean(formik.errors.owner)}
          >
            {residents.map((resident) => (
              <MenuItem key={resident.id} value={resident.id}>
                {resident.user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button color="primary" variant="contained" fullWidth type="submit">
        {initialValues ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default ParkingSpotForm;
