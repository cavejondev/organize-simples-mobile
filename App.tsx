import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./src/routes/AppRoutes";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppRoutes />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  );
}
