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
        <View style={styles.item}>

            <View style={[styles.marcador, tarefa.concluida && styles.marcadorConcluido]} />

            <TouchableOpacity style={styles.areaTexto} onPress={() => onToogle(tarefa.id)}>
                <Text style={[styles.textoTarefa]}>{tarefa.texto}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoRemover} onPress={() => onRemover(tarefa.id)}>
                <Text style={styles.textoRemover}>Excluir</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    areaTexto: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12
    },
    marcador: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#1f6feb',
        marginRight: 10
    },
    marcadorConcluido: {
        backgroundColor: '#1f6feb'
    },
    textoTarefa: {
        fontSize: 16,
        flexShrink:1
    },
    botaoRemover: {
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    textoRemover: {
        color: '#c62828',
        fontWeight: '600'
    }
});