import api from "./index";
import { User } from "./users";

export interface Resident {
  id: number;
  balance: number;
  user: User;
}

export const getResidents = async (): Promise<Resident[]> => {
  const response = await api.get("resident/");
  return response.data;
};

export const getResidentById = async (id: number): Promise<Resident> => {
  const response = await api.get(`resident/${id}/`);
  return response.data;
};

export const createResident = async (resident: Omit<Resident, "id">): Promise<Resident> => {
  const response = await api.post("resident/", resident);
  return response.data;
};

export const deleteResident = async (id: number): Promise<void> => {
  await api.delete(`resident/${id}/`);
};