import { useEffect, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tarefa } from './types/Tarefa';
import { carregarTarefas, salvarTarefas } from './storage/tarefasStorage';
import FormTarefas from './components/FormTarefas';
import ListaTarefas from './components/ListaTarefas';


export default function App() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarDados() {
      const tarefasSalvas = await carregarTarefas();
      setTarefas(tarefasSalvas);
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if(!carregando) {
      salvarTarefas(tarefas);
    }
  }, [tarefas, carregando]);

  function adicionarTarefa() {
    const textoLimpo = texto.trim();

    if(!textoLimpo) {
      Alert.alert('Atenção', 'Digite uma tarefa antes de adicionar.');
      return;
    }

    const novaTarefa : Tarefa = {
      id: Date.now().toString(),
      texto: textoLimpo,
      concluida: false
    }

    setTarefas((estadoAtual) => [novaTarefa, ...estadoAtual]);
    setTexto('');
    Keyboard.dismiss();
  }

  function alternarConclusao(id: string) {
    setTarefas((estadoAtual) => 
      estadoAtual.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
        )
    );
  }

  function removerTarefa(id: string) {
    Alert.alert(
      "Remover Tarefa",
      "Deseja realmente excluir esta tarefa?",
      [
        {text: "Cancelar"},
        {
          text: "Remover",
          onPress: () => {
            setTarefas((estadoAtual) => 
              estadoAtual.filter((tarefa) => tarefa.id != id)
            );
          }
        }
      ]
    )
  }

  function LimparConcluidas() {
    const existeConcluida = tarefas.some((tarefa) => tarefa.concluida);

    if(!existeConcluida) {
      Alert.alert("Atenção", "Não há tarefas concluídas para remover.");
      return;
    }

    setTarefas(
      (estadoAtual) => estadoAtual.filter((tarefa) => !tarefa.concluida)
    );
  }

  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <Text>
        Pendentes: {pendentes} | Concluidas: {concluidas}
      </Text>

      <FormTarefas
        texto={texto}
        onChangeTexto={setTexto}
        onAdicionar={adicionarTarefa} />

      <TouchableOpacity style={styles.botaoSecundario} onPress={LimparConcluidas}>
        <Text style={styles.textoBotaoSecundario}>Remover Concluídas</Text>
      </TouchableOpacity>

      <ListaTarefas
        tarefas={tarefas}
        onToogle={alternarConclusao}
        onRemover={removerTarefa} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingTop: 20,
    paddingHorizontal: 16
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4
  },
  botaoSecundario: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#e9eef6',
    borderRadius: 8
  },
  textoBotaoSecundario: {
    color: '#223344',
    fontWeight: '600'
  }
});
