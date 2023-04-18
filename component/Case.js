
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View,ScrollView, Button, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function Case (){


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

  // Fonction pour gérer le changement d'état d'une case à cocher
  const handleChangeCheckbox = (index) => {
    const newCheckedInputs = [...checkedInputs];
    newCheckedInputs[index] = !newCheckedInputs[index]; // Inverser l'état de la case à cocher correspondante
    setCheckedInputs(newCheckedInputs); // Mettre à jour l'état avec le nouveau tableau
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
return(
<SafeAreaView>
        <ScrollView>
      {/* Afficher les TextInput accumulés */}
      {textInputs.map((input, index) => (
        <ScrollView key={index} contentContainerStyle={styles.inputContainer}>
           
           <View style={{ flex: 1, height: 40, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 3}}>
           <Button

              title={checkedInputs[index] ? '✓' : '   '}
              onPress={() => handleChangeCheckbox(index)}></Button>
           </View>

        
         
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
        <Button title="Ajouter une tâche +" color="black" onPress={handleAddButtonClick} style={styles.buttonTitle} />
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
    flex: 9,
    
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  removeButton: {
    flex: 1,
    marginLeft: 12,
    width: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#2596be',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft:50,
    marginRight:50,
  },
  checkbox: {
    marginLeft: 12,
    borderWidth: 1, // Ajouter une bordure
    borderColor: "black", // Couleur de la bordure
    width: 20, // Largeur de la case à cocher
    height: 20, // Hauteur de la case à cocher
  },
});
