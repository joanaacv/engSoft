import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";
import theme from "./theme";

import Register from "./components/Auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/Layout";

import CondominiumPage from "./pages/Comdominum";
import Home from "./pages/Home";
import Vagas from "./pages/ParkingSpots";
import Profile from "./pages/Profile";
import Relatorios from "./pages/Reports";
import UsersPage from "./pages/Users";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="/registro"
              element={
                <PrivateRoute>
                  <Register />
                </PrivateRoute>
              }
            />

            <Route
              path="vagas"
              element={
                <PrivateRoute>
                  <Vagas />
                </PrivateRoute>
              }
            />

            <Route
              path="relatorios"
              element={
                <PrivateRoute>
                  <Relatorios />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="usuarios"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="condominio"
              element={
                <PrivateRoute>
                  <CondominiumPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    <ToastContainer />
  </ThemeProvider>
);

export default App;
