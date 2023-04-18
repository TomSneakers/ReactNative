import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View,ScrollView, Button, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function Case (){

  const [textInputs, setTextInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleAddButtonClick = () => {
    setTextInputs([...textInputs, '']);
    setCheckedInputs([...checkedInputs, false]);
  };

  const handleChangeText = (text, index) => {
    const newInputs = [...textInputs];
    newInputs[index] = text;
    setTextInputs(newInputs);
  };

  const handleChangeCheckbox = (index) => {
    const newCheckedInputs = [...checkedInputs];
    newCheckedInputs[index] = !newCheckedInputs[index];
    setCheckedInputs(newCheckedInputs);
  };

  const handleRemoveButtonClick = (index) => {
    const newInputs = [...textInputs];
    newInputs.splice(index, 1);
    setTextInputs(newInputs);

    const newCheckedInputs = [...checkedInputs];
    newCheckedInputs.splice(index, 1);
    setCheckedInputs(newCheckedInputs);
  };

  return(
    <SafeAreaView>
      <ScrollView>
        <TextInput
          placeholder="Recherche"
          style={styles.searchInput}
          onChangeText={setSearchValue}
          value={searchValue}
        />

        {textInputs
          .filter((input) => input.toLowerCase().includes(searchValue.toLowerCase()))
          .map((input, index) => (
            <ScrollView key={index} contentContainerStyle={styles.inputContainer}>
              <View style={{ flex: 1, height: 40, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, marginLeft: 3, borderRadius:100, }}>
                <Button
                  title={checkedInputs[index] ? '✓' : '   '}
                  onPress={() => handleChangeCheckbox(index)
                    }
                />
              </View>
              <TextInput
                placeholder='Entrer votre tâche'
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

        <View style={styles.button}>
<Button title="Ajouter une tâche" onPress={handleAddButtonClick} color={'black'}/>
</View>
</ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
searchInput: {
height: 40,
margin: 12,
borderWidth: 1,
padding: 10,
borderRadius: 20,
},
inputContainer: {
flex: 1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
margin: 5,
},
input: {
height: 40,
margin: 12,
borderWidth: 1,
padding: 10,
flex: 8,
borderRadius: 20,
},
removeButton: {
flex: 1,
},
button: {
marginLeft: 100,
marginRight: 100,
alignItems: 'center',
justifyContent: 'center',
borderRadius: 20,
backgroundColor: '#2196F3',
},
});



