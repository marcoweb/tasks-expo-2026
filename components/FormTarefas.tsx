import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
    texto: string;
    onChangeTexto : (valor: string) => void;
    onAdicionar: () => void;
}

export default function FormTarefas({ texto, onChangeTexto, onAdicionar } : Props) {
    return (
        <View style={style.formulario}>
            <TextInput
                style={style.input}
                placeholder = "Digite uma nova tarefa"
                value={texto}
                onChangeText={onChangeTexto}
                onSubmitEditing={onAdicionar}
                returnKeyType="done" />
            
            <TouchableOpacity style={style.botaoAdicionar} onPress={onAdicionar}>
                <Text style={style.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    formulario: {
        flexDirection: 'row',
        gap: 80,
        marginBottom: 12
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16
    },
    botaoAdicionar: {
        backgroundColor: '#1f6feb',
        borderRadius: 10,
        paddingHorizontal: 14,
        justifyContent: 'center'
    },
    textoBotao: {
        color: '#fff',
        fontWeight: '600'
    }
});