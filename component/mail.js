import * as MailComposer from 'expo-mail-composer';
import { Button } from 'react-native';
import { useContext } from 'react';
import { Context } from '../context/CaseContext';

const SendEmailButton = () => {
    const { myCase } = useContext(Context);
    const recipient = 'example@mail.com';

    const sendEmail = async () => {
        try {
            await MailComposer.composeAsync({
                recipients: [recipient],
                subject: 'Bonjour',

                body: 'Liste des courses:\n\n' + myCase.map(item => item.text).join('\n')

            });
        } catch (error) {
            console.error('Impossible d\'envoyer l\'e-mail:', error);
        }
    };

    return (
        <Button
            title="Envoyer ma liste de course par mail"
            onPress={sendEmail}
        />
    );
};

export default SendEmailButton;
