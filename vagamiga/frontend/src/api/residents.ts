import api from "./index";
import { UserResponse } from "./users";

export interface Resident {
  id: number;
  balance: number;
  user: UserResponse;
}

export const getResidents = async (): Promise<Resident[]> => {
  const response = await api.get("resident/");
  return response.data;
};

export const getResident = async (id: number): Promise<Resident> => {
  const response = await api.get(`resident/${id}/`);
  return response.data;
};

export const getResidentByUserId = async (
  userId: number
): Promise<Resident | null> => {
  const response = await api.get("resident/");
  // Filtra manualmente pelo userId
  const resident = response.data.find((r: Resident) => r.user.id === userId);
  return resident || null;
};

export const createResident = async (
  resident: Omit<Resident, "id">
): Promise<Resident> => {
  const response = await api.post("resident/", {
    ...resident,
    user: resident.user.id,
  });
  return response.data;
};

export const deleteResident = async (id: number): Promise<void> => {
  await api.delete(`resident/${id}/`);
};

export const getBalance = async (id: number): Promise<number> => {
  const response = await api.get(`resident/${id}/`);
  return response.data.balance;
};

export const updateResidentBalance = async (
  residentId: number,
  newBalance: number
): Promise<Resident> => {
  const response = await api.patch(`resident/${residentId}/`, {
    balance: newBalance,
  });
  return response.data;
};
