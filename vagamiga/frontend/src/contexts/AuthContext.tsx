import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { login as loginApi } from "../api/auth";
import { createUser, CreateUser } from "../api/users";

interface AuthContextType {
  user: any;
  admin: boolean;
  loading: boolean;
  error: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: CreateUser) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAdmin(!!parsedUser?.is_admin);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginApi(email, password);
      setUser(response.data);
      setAdmin(!!response.data?.is_admin);
      localStorage.setItem("user", JSON.stringify(response.data));
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Email ou senha incorretos");
      setUser(null);
      setAdmin(false);
    }
    setLoading(false);
  };

  const register = async (userData: CreateUser) => {
    setLoading(true);
    console.log("Register attempt:", userData);
    try {
      await createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
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
    setAdmin(false);
  };

  const value = { user, admin, loading, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
