import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthCodigo, authService } from "../services/authService";
import { api, TOKEN_JWT } from "../api/api";

type User = {
  token: string;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn(email: string, senha: string): Promise<boolean>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const token = await authService.getToken();

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser({ token });
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signIn(email: string, senha: string): Promise<boolean> {
    const response = await authService.login(email, senha);

    switch (response.data.codigo) {
      case AuthCodigo.SUCESSO:
        if (!response.data?.dados?.token) {
          return false;
        }

        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.dados.token}`;

        await AsyncStorage.setItem(TOKEN_JWT, response.data.dados.token);

        setUser({ token: response.data.dados.token });
        return true;

      case AuthCodigo.USUARIO_SENHA_INVALIDA:
      case AuthCodigo.REQUISICAO_INVALIDA:
      case AuthCodigo.ERRO_INTERNO:
      default:
        return false;
    }
  }

  async function signOut() {
    await authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
