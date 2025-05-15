// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import api from "../api";
// import { login as apiLogin, register as apiRegister } from "../api/auth";

// interface AuthContextType {
//   user: any;
//   loading: boolean;
//   error: any;
//   login: (username: string, password: string) => Promise<void>;
//   register: (data: any) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>(null!);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   // useEffect(() => {
//   //   const loadUser = async () => {
//   //     const token = localStorage.getItem("access_token");
//   //     if (token) {
//   //       try {
//   //         const response = await api.get("users/");
//   //         setUser(response.data);
//   //       } catch (err) {
//   //         logout();
//   //       }
//   //     }
//   //     setLoading(false);
//   //   };
//   //   loadUser();
//   // }, []);
//   // simulacao de login local
//   useEffect(() => {
//     const loadUser = async () => {
//       const isDev = process.env.NODE_ENV === "development";
//       const token = localStorage.getItem("access_token");

//       if (isDev && !token) {
//         // Simula login local sem API
//         const fakeUser = {
//           id: 1,
//           username: "dev_user",
//           email: "dev@local.test",
//           is_staff: true,
//         };
//         setUser(fakeUser);
//         setLoading(false);
//         return;
//       }

//       if (token) {
//         try {
//           const response = await api.get("users/");
//           setUser(response.data);
//         } catch (err) {
//           logout();
//         }
//       }

//       setLoading(false);
//     };

//     loadUser();
//   }, []);
//   // simulacao de login local

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await apiLogin({ username, password });
//       localStorage.setItem("access_token", response.data.access);
//       localStorage.setItem("refresh_token", response.data.refresh);
//       const userResponse = await api.get("users/");
//       setUser(userResponse.data);
//       setError(null);
//     } catch (err) {
//       setError(err);
//       throw err;
//     }
//   };

//   const register = async (data: any) => {
//     try {
//       await apiRegister(data);
//       setError(null);
//     } catch (err) {
//       setError(err);
//       throw err;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     setUser(null);
//   };

//   const value = { user, loading, error, login, register, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any;
  loading: boolean;
  error: any;
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // Remover validação JWT e simular login local sempre
  useEffect(() => {
    const loadUser = async () => {
      // Simula login local SEM validação de token/JWT
      const fakeUser = {
        id: 1,
        username: "dev_user",
        email: "dev@local.test",
        is_staff: true,
      };
      setUser(fakeUser);
      setLoading(false);
    };

    loadUser();
  }, []);

  // Simulação de login local SEM JWT
  const login = async (username: string, password: string) => {
    try {
      // Simula autenticação local
      const fakeUser = {
        id: 1,
        username,
        email: `${username}@local.test`,
        is_staff: true,
      };
      setUser(fakeUser);
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Simulação de registro local SEM JWT
  const register = async (data: any) => {
    try {
      // Simula registro local
      setError(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, loading, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
