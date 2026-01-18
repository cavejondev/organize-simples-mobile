import { api } from "../api/api";

export type Tarefa = {
  id: number;
  titulo: string;
  descricao?: string;
  status: "A" | "F" | "C";
  dataAgendada?: string;
  dataConclusao?: string;
  createdAt: string;
};

export async function listarTarefas(): Promise<Tarefa[]> {
  const response = await api.get("/tarefa");

  return response.data.dados;
}
