import api from "./index";

export interface Condominium {
  id: number;
  name: string;
  address: string;
  hourly_rate: number;
}

export const getCondominiums = async (): Promise<Condominium[]> => {
  const response = await api.get("condominium/");
  return response.data;
};

export const getCondominium = async (id: number): Promise<Condominium> => {
  const response = await api.get(`condominium/${id}/`);
  return response.data;
};

export const createCondominium = async (
  data: Omit<Condominium, "id">
): Promise<Condominium> => {
  const response = await api.post("condominium/", data);
  return response.data;
};

export const updateCondominium = async (
  id: number,
  data: Partial<Condominium>
): Promise<Condominium> => {
  const response = await api.patch(`condominium/${id}/`, data);
  return response.data;
};

export const deleteCondominium = async (id: number): Promise<void> => {
  await api.delete(`condominium/${id}/`);
};
