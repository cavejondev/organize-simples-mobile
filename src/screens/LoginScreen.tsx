import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha e-mail e senha para continuar",
      );
      return;
    }

    setLoading(true);
    try {
      const ok = await signIn(email, senha);

      if (!ok) {
        Alert.alert("Login inválido", "E-mail ou senha incorretos");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    /**
     * KeyboardAvoidingView:
     * Este componente resolve o problema do teclado cobrir os campos de input.
     *
     * * Propriedades utilizadas:
     * - behavior: Define como o layout vai reagir à abertura do teclado.
     * - 'padding': No iOS, adiciona um preenchimento interno na base da tela,
     *    empurrando o conteúdo para cima de forma fluida.
     * - 'height': No Android, redimensiona a altura da View principal para
     *    ajustar o conteúdo no espaço disponível acima do teclado.
     * - Platform.OS: Usamos para detectar o sistema e aplicar o comportamento
     *    específico que melhor funciona em cada um.
     */
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Faça login para continuar no organize simples mobile
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F0F2F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
