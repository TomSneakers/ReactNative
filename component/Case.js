import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WriteToFile() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      //La fonction AsyncStorage.getItem('tasks') récupère la valeur de la clé "tasks" stockée dans AsyncStorage. Si une valeur est récupérée avec succès,
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks) {
        //a fonction JSON.parse convertit la valeur JSON en un objet JavaScript
        setTaskList(JSON.parse(tasks));
      }
    }
    //Si une erreur se produit alors elle sera afficher dans les log
    catch (error) {
      console.log(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      //Cette fonction utilise la méthode AsyncStorage.setItem pour enregistrer les tâches
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      //JSON.stringify(tasks) permet de passer les enregistremetn sous forme de chaine JSON
    } catch (error) {
      //Si une erreur se produit alors elle sera afficher dans les log

      console.log(error);
    }
  };

  const addTask = () => {
    if (task) {
      const newTaskList = [...taskList, { text: task, completed: false }];
      setTaskList(newTaskList);
      setTask('');
      saveTasks(newTaskList);
    }
  };

  const toggleCompleted = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
    saveTasks(updatedTaskList);
  };

  const removeTask = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    saveTasks(updatedTaskList);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Ajouter une tâche"
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
      {taskList.map((task, index) => (
        <View style={styles.taskContainer} key={index}>
          <TouchableOpacity onPress={() => toggleCompleted(index)}>
            <Text style={[styles.taskText, task.completed && styles.completed]}>{task.text}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeTask(index)}>
            <Text style={styles.removeButton}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    marginRight: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
})