import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar(props) {
    const [search, setSearch] = useState('');
    const { taskList, onFilter } = props;

    const filterHandler = (value) => {
        setSearch(value);
        const filtredTaks = taskList.filter((task) =>
            task.text.toLowerCase().includes(value.toLowerCase())
        );
        onFilter(filtredTaks);
    };

    return (
        <View style={style.container}>
            <TextInput
                placeholder="Recherche un article"
                onChangeText={filterHandler}
                value={search}
                style={style.input}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        width: '100%',
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
    }
})