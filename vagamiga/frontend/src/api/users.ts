import api from "./index";

export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string; // não deve ser retornado pelo backend após o login
  condominium: number | null; // pode ser um objeto se usar depth=1
  is_admin: boolean;
}

// Buscar todos os usuários
export const getUsers = async (): Promise<UserData[]> => {
  const response = await api.get("/user/");
  return response.data;
};

// Buscar usuário por ID
export const getUser = async (id: number): Promise<UserData> => {
  const response = await api.get(`/user/${id}/`);
  return response.data;
};

// Criar novo usuário (registro)
export const createUser = async (
  data: Omit<UserData, "id" | "created_at" | "updated_at">
): Promise<UserData> => {
  const response = await api.post("/user/", data);
  return response.data;
};

// Atualizar usuário
export const updateUser = async (
  id: number,
  data: Partial<UserData>
): Promise<UserData> => {
  const response = await api.patch(`/user/${id}/`, data);
  return response.data;
};

// Deletar usuário
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/user/${id}/`);
};
