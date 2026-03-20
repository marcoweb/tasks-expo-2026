import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tarefa } from './types/Tarefa';
import { carregarTarefas, salvarTarefas } from './storage/tarefasStorage';

export default function App() {
  return (
    <SafeAreaView>
      <Text>Lista de Tarefas</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
