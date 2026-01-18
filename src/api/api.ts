import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const TOKEN_JWT = "@organize:token";

export const api = axios.create({
  baseURL: "http://192.168.0.37:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },

  validateStatus: function (status) {
    // Aceita qualquer status HTTP
    return status >= 200 && status < 600;
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.responose?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_JWT);

      // remove header
      delete api.defaults.headers.common["Authorization"];
    }

    return Promise.reject(error);
  },
);
