import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { listarTarefas, Tarefa } from "../services/tarefaService";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const data = await listarTarefas();
        setTarefas(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: signOut },
    ]);
  }

  function renderItem({ item }: { item: Tarefa }) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={[styles.status, statusStyle[item.status]]}>
            {statusLabel[item.status]}
          </Text>
        </View>

        {!!item.descricao && (
          <Text style={styles.descricao}>{item.descricao}</Text>
        )}

        <Text style={styles.data}>
          Criado em {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER TOP */}
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Atividades</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const statusLabel = {
  A: "Aberta",
  F: "Finalizada",
  C: "Cancelada",
};

const statusStyle = {
  A: { backgroundColor: "#FEF3C7", color: "#92400E" },
  F: { backgroundColor: "#DCFCE7", color: "#166534" },
  C: { backgroundColor: "#FEE2E2", color: "#991B1B" },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },
  logout: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 10,
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "600",
  },
  descricao: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  data: {
    marginTop: 10,
    fontSize: 12,
    color: "#9CA3AF",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
