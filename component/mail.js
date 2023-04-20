import * as MailComposer from 'expo-mail-composer';
import { useContext } from 'react';
import { Context } from '../context/CaseContext';



const [myCase, setMyCase] = useContext(Context);

const SendEmail = () => {
    const options = {
        recipients: ['example@mail.com'],
        subject: 'Liste de coursel',
        body: JSON.stringify(myCase),
    };

    MailComposer.composeAsync(options);
};
export default SendEmail
