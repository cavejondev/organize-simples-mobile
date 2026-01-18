import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, TOKEN_JWT } from "../api/api";
import { ApiResponse } from "../types/ApiResponse";
import { AxiosResponse } from "axios";

export interface LoginResponse {
  token: string;
}

export enum AuthCodigo {
  SUCESSO = "LOGIN_SUCESSO",
  USUARIO_SENHA_INVALIDA = "LOGIN_USUARIO_SENHA_INVALIDA",
  REQUISICAO_INVALIDA = "LOGIN_REQUISICAO_INVALIDA",
  ERRO_INTERNO = "LOGIN_ERRO_INTERNO",
}

export const authService = {
  async login(
    email: string,
    senha: string,
  ): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
    const response = await api.post<ApiResponse<LoginResponse>>("/login", {
      email,
      senha,
    });

    return response;
  },

  async logout(): Promise<void> {
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem(TOKEN_JWT);
  },

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_JWT);
  },
};
