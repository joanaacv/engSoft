import api from "./index";

export interface ParkingSpot {
  id: number;
  spot_name: string;
  condominium: number; // ou Condominium se quiser expandido
  for_rent: boolean;
  owner: number | null; // ou Resident se quiser expandido
}

// Buscar todas as vagas
export const getParkingSpots = async (): Promise<ParkingSpot[]> => {
  const response = await api.get("/parkingspots/");
  return response.data;
};

// Buscar uma vaga específica
export const getParkingSpot = async (id: number): Promise<ParkingSpot> => {
  const response = await api.get(`/parkingspots/${id}/`);
  return response.data;
};

// Criar nova vaga
export const createParkingSpot = async (
  data: Omit<ParkingSpot, "id">
): Promise<ParkingSpot> => {
  const response = await api.post("/parkingspots/", data);
  return response.data;
};

// Atualizar uma vaga
export const updateParkingSpot = async (
  id: number,
  data: Partial<ParkingSpot>
): Promise<ParkingSpot> => {
  const response = await api.patch(`/parkingspots/${id}/`, data);
  return response.data;
};

// Deletar uma vaga
export const deleteParkingSpot = async (id: number): Promise<void> => {
  await api.delete(`/parkingspots/${id}/`);
};