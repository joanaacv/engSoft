import api from "./index";
import { ParkingSpot } from "./parkingspots";
import { Resident } from "./residents";

export interface Report {
  id: number;
  landlord: Resident;
  tenant: Resident;
  spot: ParkingSpot;
  start_date: string; // formato ISO: 'YYYY-MM-DD'
  end_date: string;
  payment_confirmed: boolean;
  amount: number; // ou number, dependendo da conversão no backend
}

export const getReports = async (): Promise<Report[]> => {
  const response = await api.get("report/");
  return response.data;
};

export const getReport = async (id: number): Promise<Report> => {
  const response = await api.get(`report/${id}/`);
  return response.data;
};

export const createReport = async (
  data: Omit<Report, "id">
): Promise<Report> => {
  const response = await api.post("report/", data);
  return response.data;
};

export const payReport = async (id: number): Promise<Report> => {
  const response = await api.post(`report/${id}/pay/`);
  return response.data;
};

export const getReportsAsLandlord = async (
  landlord: number
): Promise<Report[]> => {
  const response = await api.get("report/", {
    params: { user: landlord },
  });
  return response.data ?? []; // garante que sempre retorna um array
};

export const getReportsAsTenant = async (tenant: number): Promise<Report[]> => {
  const response = await api.get("report/", {
    params: { user: tenant },
  });
  return response.data ?? []; // garante que sempre retorna um array
};
