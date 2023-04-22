import * as MailComposer from 'expo-mail-composer';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { Context } from '../context/CaseContext';

const SendEmailButton = () => {
    const { myCase } = useContext(Context);
    const recipient = 'mounir.bendahmane@ecole-isitech.fr';

    const sendEmail = async () => {
        try {
            await MailComposer.composeAsync({
                recipients: [recipient],
                subject: 'Liste de course',

                body: 'Liste des courses:\n\n' + myCase.map(item => item.text).join('\n')

            });
        } catch (error) {
            console.error('Impossible d\'envoyer l\'e-mail:', error);
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
