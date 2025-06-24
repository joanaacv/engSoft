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
  try {
    const response = await api.get("/parkingspot/");
    return response.data;
  } catch (error) {
    // Trate o erro conforme necessário, por exemplo:
    console.error("Erro ao buscar vagas:", error);
    throw error;
  }
};

// Buscar uma vaga específica
export const getParkingSpot = async (id: number): Promise<ParkingSpot> => {
  const response = await api.get(`/parkingspot/${id}/`);
  return response.data;
};

// Criar nova vaga
export const createParkingSpot = async (
  data: Omit<ParkingSpot, "id">
): Promise<ParkingSpot> => {
  const response = await api.post("/parkingspot/", data);
  return response.data;
};

// Atualizar uma vaga
export const updateParkingSpot = async (
  id: number,
  data: Partial<ParkingSpot>
): Promise<ParkingSpot> => {
  const response = await api.patch(`/parkingspot/${id}/`, data);
  return response.data;
};

// Deletar uma vaga
export const deleteParkingSpot = async (id: number): Promise<void> => {
  await api.delete(`/parkingspot/${id}/`);
};
