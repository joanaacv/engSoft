import { Box, Button, Divider, TextField, Typography } from "@mui/material";

export default function AnunciarVaga() {
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Anunciar Vaga
      </Typography>
      <form>
        <TextField
          label="Condomínio"
          name="condominium"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Endereço"
          name="adress"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Início"
          name="start_date"
          type="datetime-local"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Fim"
          name="end_date"
          type="datetime-local"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Divider sx={{ my: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Anunciar
        </Button>
      </form>
    </Box>
  );
}
