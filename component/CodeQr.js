import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useContext } from 'react';
import { Context } from '../context/CaseContext';

export default function CodeQR() {
    const { myCase, SetMyCase } = useContext(Context)

    const data = JSON.stringify(myCase)

    return (

        <View style={styles.container}>
            <QRCode value={data} />
            <StatusBar />
        </View>
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