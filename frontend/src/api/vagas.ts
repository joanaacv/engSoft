import api from "./index";

export interface Vaga {
  id: number;
  numero: string;
  condominio: number;
  proprietario?: number;
  disponivel: boolean;
}

export const getVagas = async (condominioId?: number): Promise<Vaga[]> => {
  const url = condominioId ? `vagas/?condominio=${condominioId}` : "vagas/";
  const response = await api.get(url);
  return response.data;
};

export const getVaga = async (id: number): Promise<Vaga> => {
  const response = await api.get(`vagas/${id}/`);
  return response.data;
};

export const createVaga = async (data: Omit<Vaga, "id">): Promise<Vaga> => {
  const response = await api.post("vagas/", data);
  return response.data;
};

export const updateVaga = async (
  id: number,
  data: Partial<Vaga>
): Promise<Vaga> => {
  const response = await api.patch(`vagas/${id}/`, data);
  return response.data;
};

export const deleteVaga = async (id: number): Promise<void> => {
  await api.delete(`vagas/${id}/`);
};

export const claimVaga = async (id: number): Promise<Vaga> => {
  const response = await api.post(`vagas/${id}/claim/`);
  return response.data;
};

export const getAvailableVagas = async (
  condominioId: number,
  inicio: string,
  fim: string
): Promise<Vaga[]> => {
  const response = await api.get(
    `vagas/available/?condominio=${condominioId}&inicio=${inicio}&fim=${fim}`
  );
  return response.data;
};
