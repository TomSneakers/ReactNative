import { StyleSheet, Text, View } from 'react-native'; // Importation des composants StyleSheet, Text et View de react-native
import QRCode from 'react-native-qrcode-svg'; // Importation du composant QRCode de react-native-qrcode-svg
import { useContext } from 'react'; // Importation de la fonction useContext de React
import { Context } from '../context/CaseContext'; // Importation du composant Context de ../context/CaseContext

export default function CodeQR() { // Définition du composant CodeQR en tant que composant par défaut
    const { myCase } = useContext(Context) // Récupération de myCase à partir du Context de CaseContext en utilisant la fonction useContext

    const data = JSON.stringify(myCase); // Convertit myCase en chaîne de caractères JSON et l'affecte à la variable data

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Partager votre liste de course</Text> 
            <QRCode value={data} size={300} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Définit les styles du composant View
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { // Définit les styles du composant Text
        marginBottom: 50,
        fontSize: 40,
        textAlign: 'center',
        color: '#00C4CC',
    },
});
