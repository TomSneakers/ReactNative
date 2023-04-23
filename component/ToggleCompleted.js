import { Text, TouchableOpacity } from "react-native";

// Définition de la fonction toggleCompleted
export const toggleCompleted = (index) => {
    // Déclaration d'un état taskList et sa mise à jour via setTaskList
    const [taskList, setTaskList] = useState([]);
    // Copie de taskList dans updatedTaskList
    const updatedTaskList = [...taskList];
    // Inversion de l'état de complétion de la tâche sélectionnée
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    // Mise à jour de l'état taskList avec la nouvelle liste de tâches
    setTaskList(updatedTaskList);
    // Sauvegarde de la liste mise à jour
    saveTasks(updatedTaskList);

    // Rendu de la tâche en tant que TouchableOpacity
    return (
        <TouchableOpacity onPress={() => toggleCompleted(index)}>
            <Text style={[styles.taskText, task.completed && styles.completed]}></Text>
        </TouchableOpacity>
    )
};

// Définition du style
const styles = StyleSheet.create({
    taskText: {
        fontSize: 18,
        marginRight: 10,
    },
    completed: {
        textDecorationLine: 'line-through',
    },
})
