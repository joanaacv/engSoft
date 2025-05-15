import api from "./index";

export interface Condominio {
  id: number;
  nome: string;
  endereco: string;
  preco_por_hora: number;
  codigo_convite?: string;
}

export const getCondominios = async (): Promise<Condominio[]> => {
  const response = await api.get("condominios/");
  return response.data;
};

export const getCondominio = async (id: number): Promise<Condominio> => {
  const response = await api.get(`condominios/${id}/`);
  return response.data;
};

export const createCondominio = async (
  data: Omit<Condominio, "id">
): Promise<Condominio> => {
  const response = await api.post("condominios/", data);
  return response.data;
};

export const updateCondominio = async (
  id: number,
  data: Partial<Condominio>
): Promise<Condominio> => {
  const response = await api.patch(`condominios/${id}/`, data);
  return response.data;
};

export const deleteCondominio = async (id: number): Promise<void> => {
  await api.delete(`condominios/${id}/`);
};

export const addAdminToCondominio = async (
  condominioId: number,
  userId: number
): Promise<void> => {
  await api.post(`condominios/${condominioId}/add_admin/`, { user_id: userId });
};

export const inviteResident = async (
  condominioId: number,
  email: string
): Promise<void> => {
  await api.post(`condominios/${condominioId}/invite_resident/`, { email });
};

export const joinCondominio = async (
  codigoConvite: string
): Promise<Condominio> => {
  const response = await api.post("condominios/join/", {
    codigo_convite: codigoConvite,
  });
  return response.data;
};
