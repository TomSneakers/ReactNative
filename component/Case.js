import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './search';
import TaskList from './taskList';
import { Context } from '../context/CaseContext';

export default function WriteToFile() {
  // get the context
  const { myCase, setMyCase } = useContext(Context);

  const [task, setTask] = useState('');
  const [originalTaskList, setOriginalTaskList] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

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

  const toggleCompleted = (index) => {
    const updatedTaskList = [...myCase];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setMyCase(updatedTaskList);
    saveTasks(updatedTaskList);
  };

  const removeTask = async (index) => {
    const updatedTaskList = [...myCase];
    updatedTaskList.splice(index, 1);
    setMyCase(updatedTaskList);
    await saveTasks(updatedTaskList);
    await loadTasks()
  };

  const saveTasks = async (tasks) => {
    try {
      return await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  };

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
      <View >
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Ajouter une tâche"
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Ajouter</Text>

        </TouchableOpacity>
        <SearchBar taskList={originalTaskList} onFilter={setMyCase} />
        <TaskList taskList={myCase} styles={styles} onComplete={toggleCompleted} onRemove={removeTask} />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  removeButton: {


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
    backgroundColor: '#007AFF',
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

