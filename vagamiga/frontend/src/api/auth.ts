import api from "./index";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  user_type: string;
  first_name: string;
  last_name: string;
}

export const login = (data: LoginData) => api.post("auth/", data);
export const register = (data: RegisterData) => api.post("users/", data);
export const refreshToken = (refresh: string) =>
  api.post("auth/refresh/", { refresh });
