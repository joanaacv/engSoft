import api from "./index";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // não deve ser retornado pelo backend após o login
  condominium: number | null; // pode ser um objeto se usar depth=1
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Buscar todos os usuários
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users/");
  return response.data;
};

// Buscar usuário por ID
export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}/`);
  return response.data;
};

// Criar novo usuário (registro)
export const createUser = async (
  data: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> => {
  const response = await api.post("/users/", data);
  return response.data;
};

// Atualizar usuário
export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  const response = await api.patch(`/users/${id}/`, data);
  return response.data;
};

// Deletar usuário
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}/`);
};
