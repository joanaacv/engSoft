import api from "./index";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "admin" | "locador" | "locatario";
  cpf?: string;
  phone?: string;
  pix_key?: string;
  balance?: number;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("users/");
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`users/${id}/`);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("users/me/");
  return response.data;
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  const response = await api.patch(`users/${id}/`, data);
  return response.data;
};

export const updateCurrentUser = async (data: Partial<User>): Promise<User> => {
  const response = await api.patch("users/me/", data);
  return response.data;
};

export const withdrawBalance = async (
  amount: number,
  pixKey: string
): Promise<void> => {
  await api.post("users/withdraw/", { amount, pix_key: pixKey });
};
