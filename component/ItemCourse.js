import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './Search';
import TaskList from './TaskList';
import { Context } from '../context/CaseContext';
import { shouldUseActivityState } from 'react-native-screens';

export default function ItemCourse() {
  // Récupérer le contexte
  const { myCase, setMyCase, scanned } = useContext(Context);

  // Définir les états pour la tâche et la liste de tâches originales
  const [task, setTask] = useState('');
  const [originalTaskList, setOriginalTaskList] = useState([]);

  // Charger les tâches depuis le stockage asynchrone lors du montage du composant
  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(function () {
    setOriginalTaskList(myCase)
  }, [scanned])

  // Fonction pour charger les tâches depuis le stockage asynchrone
  const loadTasks = async () => {
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks) {
        setMyCase(JSON.parse(tasks));
        setOriginalTaskList(JSON.parse(tasks));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour inverser l'état d'achèvement d'une tâche
  const toggleCompleted = (index) => {
    const updatedTaskList = [...myCase];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setMyCase(updatedTaskList);
    saveTasks(updatedTaskList);
  };

  // Fonction pour supprimer une tâche
  const removeTask = async (index) => {
    const updatedTaskList = [...myCase];
    updatedTaskList.splice(index, 1);
    setMyCase(updatedTaskList);
    await saveTasks(updatedTaskList);
    await loadTasks()
  };

  // Fonction pour enregistrer les tâches dans le stockage asynchrone
  const saveTasks = async (tasks) => {
    try {
      return await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour ajouter une nouvelle tâche à la liste
  const addTask = () => {
    if (task) {
      const newTaskList = [...myCase, { text: task, completed: false }];
      setTask('');
      saveTasks(newTaskList);
      setMyCase(newTaskList)
      setOriginalTaskList(newTaskList)
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Ajouter un article à votre liste de course"
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
        <View style={{ borderBottomWidth: 2, borderBottomColor: 'black', marginBottom: 20 }} />
        <SearchBar taskList={originalTaskList} onFilter={setMyCase} />
        <TaskList taskList={myCase} styles={styles} onComplete={toggleCompleted} onRemove={removeTask} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  removeButton: {


  },
  StatusBar: {
    borderColor: 'black',
    borderWidth: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffff',
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

    flexDirection: 'row'
  },
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

  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  taskText: {
    fontSize: 18,
    color: '#2c3e50',
    flex: 1,
    marginRight: 12,
    textDecorationLine: 'none',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  removeButton: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
    padding: 8,
  },
});

