import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useContext } from 'react';
import { Context } from '../context/CaseContext';

export default function CodeQR() {
    const { myCase, SetMyCase } = useContext(Context)

    const data =  myCase.map(item => item.text).join('\n')


    return (

        <View style={styles.container}>
            <Text style={styles.text}> Partager votre liste de course</Text>
            <QRCode value={data} size={300} />

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
    text:{
       marginBottom:10,
        fontSize:50,
        textAlign: 'center'
       
    },
});