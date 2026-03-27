import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { Tarefa } from "../types/Tarefa";
import ItemTarefa from "./ItemTarefa";

type Props = {
    tarefas: Tarefa[];
    onToogle: (id: string) => void;
    onRemover: (id: string) => void;
}

export default function ListaTarefas ({ tarefas, onToogle, onRemover} : Props) {
    return (
        <FlatList data={tarefas}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>Nenhuma Tarefa Cadastrada</Text>}
            renderItem={({item}) => (
                <ItemTarefa tarefa={item} onToogle={onToogle} onRemover={onRemover} />
            )} />
    );
}