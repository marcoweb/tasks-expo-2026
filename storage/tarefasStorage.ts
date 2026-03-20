import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tarefa } from "../types/Tarefa";

const CHAVE_TAREFAS = '@minha_lista_tarefas';

export async function carregarTarefas() : Promise<Tarefa[]> {
    try {
        const dados = await AsyncStorage.getItem(CHAVE_TAREFAS);
        return dados ? JSON.parse(dados) : [];
    } catch(error) {
        console.error('Erro ao carregar tarefas', error);
        return [];
    }
}

export async function salvarTarefas(tarefas : Tarefa[]) : Promise<void> {
    try {
        await AsyncStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
    } catch(erro) {
        console.error('Erro ao salvar tarefas: ', erro);
    }
}

