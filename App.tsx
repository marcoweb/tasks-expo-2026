import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tarefa } from './types/Tarefa';
import { carregarTarefas, salvarTarefas } from './storage/tarefasStorage';
import FormTarefas from './components/FormTarefas';


export default function App() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [carregando, setCarregando] = useState(true)

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <FormTarefas
        texto={texto}
        onChangeTexto={setTexto}
        onAdicionar={adicionarTarefa} />

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
  }
});
