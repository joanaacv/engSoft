import api from "./index";

export const login = async (email: string, password: string) => {
  return api.post("auth/", { email, password }, { withCredentials: true });
};

// TODO: verificar
export const refreshToken = (refresh: string) =>
  api.post("auth/refresh/", { refresh });
