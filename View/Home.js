import { DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View,ScrollView, Button, CheckBox } from 'react-native';

const Home = () => {
  const [textInputs, setTextInputs] = useState([]); // Etat pour stocker les valeurs des TextInput
  const [checkedInputs, setCheckedInputs] = useState([]); // Etat pour stocker les états des cases à cocher

  // Fonction pour gérer le clic sur le bouton "+"
  const handleAddButtonClick = () => {
    setTextInputs([...textInputs, '']); // Ajouter un nouvel élément vide au tableau textInputs
    setCheckedInputs([...checkedInputs, false]); // Ajouter une nouvelle case à cocher avec l'état initial à false au tableau checkedInputs
  };

  // Fonction pour gérer le changement de texte dans un TextInput
  const handleChangeText = (text, index) => {
    const newInputs = [...textInputs];
    newInputs[index] = text; // Mettre à jour la valeur du TextInput correspondant dans le tableau
    setTextInputs(newInputs); // Mettre à jour l'état avec le nouveau tableau
  };

  // Fonction pour gérer le clic sur le bouton "-"
  const handleRemoveButtonClick = (index) => {
    const newInputs = [...textInputs];
    newInputs.splice(index, 1); // Supprimer l'élément correspondant du tableau textInputs
    setTextInputs(newInputs); // Mettre à jour l'état avec le nouveau tableau

    const newCheckedInputs = [...checkedInputs];
    newCheckedInputs.splice(index, 1); // Supprimer l'élément correspondant du tableau checkedInputs
    setCheckedInputs(newCheckedInputs); // Mettre à jour l'état avec le nouveau tableau
  };
  const [isSelected, setSelection] = useState(false);


  return (
    <SafeAreaView>
        <ScrollView>
      {/* Afficher les TextInput accumulés */}
      {textInputs.map((input, index) => (
        <ScrollView key={index} contentContainerStyle={styles.inputContainer}>
           
           <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        
         
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChangeText(text, index)}
            value={input}
          />
          <Button
            title="-"
            onPress={() => handleRemoveButtonClick(index)}
            style={styles.removeButton}
          />
          
        </ScrollView>
      ))}

      {/* Afficher le bouton "+" */}
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={handleAddButtonClick} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  removeButton: {
    marginLeft: 12,
    width: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default Home