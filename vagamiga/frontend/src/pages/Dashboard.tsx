import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Bem-vindo, {user?.first_name} {user?.last_name} ({user?.user_type})
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Condomínios
              </Typography>
              <Typography color="textSecondary">
                Gerencie seus condomínios
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Vagas
              </Typography>
              <Typography color="textSecondary">
                Visualize e gerencie vagas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Locações
              </Typography>
              <Typography color="textSecondary">
                Histórico de locações
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
