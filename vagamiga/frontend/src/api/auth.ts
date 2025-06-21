import api from "./index";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  condominium_id?: number; // opcional, se o backend permitir
  is_admin?: boolean;
}

export const login = (data: LoginData) =>
  api.post("auth/", {
    username: data.email,
    password: data.password,
  });
export const register = (data: RegisterData) => api.post("users/", data);
export const refreshToken = (refresh: string) =>
  api.post("auth/refresh/", { refresh });
