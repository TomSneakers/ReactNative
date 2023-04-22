import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const navigation = useNavigation();

    // Récupération des données sauvegardées dans AsyncStorage
    const getData = async () => {
        try {
            const usernameValue = await AsyncStorage.getItem('username');
            const bioValue = await AsyncStorage.getItem('bio');
            if (usernameValue !== null && bioValue !== null) {
                setUsername(usernameValue);
                setBio(bioValue);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Sauvegarde des données dans AsyncStorage
    const saveData = async () => {
        try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('bio', bio);
        } catch (error) {
            console.log(error);
        }
    };

    return (


        <View style={styles.container}>
            <Text style={styles.title}>Mon profil</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Biographie"
                value={bio}
                onChangeText={setBio}
            />
            <TouchableOpacity onPress={saveData}>
                <Text style={styles.title2}> Sauvegarder</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00C4CC',
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00C4CC',
    },
    input: {
        borderWidth: 1,
        borderColor: '#A9A9A9',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        fontSize: 18,
    },
});
