import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../context/CaseContext';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';



export default function ScanQR() {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const { myCase, setMyCase, scanned, setScanned } = useContext(Context);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        const parsedData = JSON.parse(data);
        setScanned(true);
        setMyCase(parsedData); // save scanned data
        await AsyncStorage.setItem('tasks', data)
        Alert.alert('LISTE AJOUTÉE', 'La liste de course à été ajouter dans accueil', [
            {
              text: 'OK',
              onPress: () => console.log('La liste de course a été ajoutée dans accueil'),}
          ]);
    };

    if (hasPermission === null) {
        return <Text>Demande d'autorisation de la caméra</Text>;
    }
    if (hasPermission === false) {
        return <Text>Pas d'accès à la caméra</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <View style={styles.afterScan}>


                    <Text style={styles.text}>La liste de course à été synchronisé</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                        <Text  style={styles.buttonText}>Scanner à nouveau</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={async () => { navigation.navigate("Accueil") }}>
                        <Text style={styles.buttonText}>Afficher les données scannées</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF'
    },
    button: {
    backgroundColor: '#00C4CC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    },
    buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center'
    },
    afterScan: {
        marginTop: 600,
    },
    });