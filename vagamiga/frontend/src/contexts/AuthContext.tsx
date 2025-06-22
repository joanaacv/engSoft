import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { login as loginApi } from "../api/auth";
import { createUser, UserData } from "../api/users";

interface AuthContextType {
  user: any;
  loading: boolean;
  error: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: UserData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginApi(email, password);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Email ou senha incorretos");
      setUser(null);
    }
    setLoading(false);
  };

  const register = async (userData: UserData) => {
    setLoading(true);
    console.log("Register attempt:", userData);
    try {
      await createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        condominium: userData.condominium || null,
        is_admin: userData.is_admin || false,
      });
      console.log("User registered successfully");
      setError(null);
    } catch (err: any) {
      console.log("Register error:", err);
      setError(err?.response?.data?.detail || "Erro ao registrar");
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, loading, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
