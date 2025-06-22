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

export const getResidentById = async (id: number): Promise<Resident> => {
  const response = await api.get(`resident/${id}/`);
  return response.data;
};

export const getResidentByUserId = async (userId: number): Promise<Resident | null> => {
  const response = await api.get("resident/", {
    params: { user: userId },
  });

  // Verifica se há algum residente associado a esse usuário
  return response.data.length > 0 ? response.data[0] : null;
};

export const createResident = async (
  resident: Omit<Resident, "id">
): Promise<Resident> => {
  const response = await api.post("resident/", resident);
  return response.data;
};

export const deleteResident = async (id: number): Promise<void> => {
  await api.delete(`resident/${id}/`);
};


export const getBalance = async (id: number): Promise<number> => {
  const response = await api.get(`resident/${id}/`);
  return response.data.balance;
};
