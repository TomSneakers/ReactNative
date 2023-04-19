import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { FileSystem } from 'expo-file-system';

const WriteToFile = () => {
  const [inputText, setInputText] = useState('');

  const handleWriteToFile = async () => {
    // Vérifier si l'application dispose des autorisations pour écrire dans un fichier
    const { status } = await FileSystem.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès au système de fichiers pour utiliser cette fonctionnalité.');
      return;
    }

    // Définir le chemin du fichier
    const path = FileSystem.documentDirectory + 'filename.txt';

    // Écrire le texte dans le fichier
    try {
      await FileSystem.writeAsStringAsync(path, inputText, { encoding: FileSystem.EncodingType.UTF8 });
      Alert.alert('Succès', 'Le texte a été écrit dans le fichier.');
    } catch (error) {
      console.log(error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'écriture du fichier.');
    }
  }

  return (
    <View>
      {/* TextInput pour capturer le texte entré par l'utilisateur */}
      <TextInput
        placeholder="Entrez le texte ici"
        onChangeText={text => setInputText(text)}
        value={inputText}
      />

      {/* Bouton pour déclencher l'écriture du fichier */}
      <Button
        title="Écrire dans un fichier"
        onPress={handleWriteToFile}
      />
    </View>
  );
}

export default WriteToFile;
