import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";
import theme from "./theme";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Layout from "./components/Layout";

import Condominios from "./pages/Condominiums";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Locacoes from "./pages/Locacoes";
import Vagas from "./pages/ParkingSpots";
import Profile from "./pages/Profile";
import Relatorios from "./pages/Reports";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="condominios"
              element={
                <PrivateRoute>
                  <Condominios />
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
              path="locacoes"
              element={
                <PrivateRoute>
                  <Locacoes />
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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    <ToastContainer />
  </ThemeProvider>
);

export default App;
