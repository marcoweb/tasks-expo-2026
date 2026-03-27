import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Tarefa } from '../types/Tarefa';

type Props = {
    tarefa: Tarefa;
    onToogle: (id: string) => void;
    onRemover: (id: string) => void;
}

export default function ItemTarefa({ tarefa, onToogle, onRemover } : Props) {
    return (
        <View>
            <TouchableOpacity onPress={() => onToogle(tarefa.id)}>
                <Text>{tarefa.texto}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRemover(tarefa.id)}>
                <Text>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}