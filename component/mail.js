import * as MailComposer from 'expo-mail-composer'; // Import de la bibliothèque expo-mail-composer pour envoyer des e-mails dans l'application.
import { StyleSheet, Text, TouchableOpacity } from 'react-native'; // Import des composants StyleSheet, Text et TouchableOpacity de la bibliothèque React Native pour créer un bouton stylisé.
import { useContext } from 'react'; // Import du composant useContext de la bibliothèque React pour accéder à des données stockées dans un contexte.
import { Context } from '../context/CaseContext'; // Import du contexte CaseContext depuis le fichier context/CaseContext.js.

const SendEmailButton = () => { // Définition d'un composant fonctionnel SendEmailButton qui renvoie un bouton pour envoyer un e-mail.
    const { myCase } = useContext(Context); // Extraction des données de myCase stockées dans le contexte CaseContext à l'aide du hook useContext.
    const recipient = 'mounir.bendahmane@ecole-isitech.fr'; // Définition d'une variable qui stocke l'adresse e-mail du destinataire.

    const sendEmail = async () => { // Définition d'une fonction asynchrone nommée sendEmail qui envoie l'e-mail.
        try {
            await MailComposer.composeAsync({ // Utilisation de la méthode composeAsync() de la bibliothèque expo-mail-composer pour composer et envoyer un e-mail.
                recipients: [recipient], // Définition du destinataire de l'e-mail.
                subject: 'Liste de course', // Définition de l'objet de l'e-mail.
                body: 'Liste des courses:\n\n' + myCase.map(item => item.text).join('\n') // Définition du corps de l'e-mail qui contient la liste des courses stockées dans la variable myCase sous forme de chaîne de caractères.
            });
        } catch (error) { // Gestion des erreurs éventuelles.
            console.error('Impossible d\'envoyer l\'e-mail:', error); // Affichage d'un message d'erreur dans la console en cas d'échec de l'envoi de l'e-mail.
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={sendEmail}>
            <Text style={styles.buttonText}>Envoyer ma liste par mail</Text> 
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({


    button: {
        backgroundColor: '#00C4CC',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})


export default SendEmailButton;