import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar(props) {
const [search, setSearch] = useState(''); // déclare un state pour stocker la valeur de recherche entrée par l'utilisateur
const { taskList, onFilter } = props; // déstructure les propriétés taskList et onFilter de l'objet props
const filterHandler = (value) => { // fonction qui filtre les tâches en fonction de la valeur de recherche entrée par l'utilisateur
    setSearch(value); // met à jour la valeur du state search avec la valeur de recherche entrée par l'utilisateur
    const filtredTaks = taskList.filter((task) => // filtre les tâches en fonction de la valeur de recherche entrée par l'utilisateur (ignorant la casse)
        task.text.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filtredTaks); // appelle la fonction onFilter avec les tâches filtrées en tant qu'argument
};

return (
    <View style={style.container}>
        <TextInput
            placeholder="Recherche un article" // affiche un texte de remplacement dans le champ de recherche
            onChangeText={filterHandler} // appelle la fonction filterHandler à chaque changement de texte dans le champ de recherche
            value={search} // la valeur du champ de recherche est liée au state search
            style={style.input} // applique le style défini dans l'objet style à ce composant
        />
    </View>
);}


// Style 
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