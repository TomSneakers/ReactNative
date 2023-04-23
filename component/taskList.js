import { TouchableOpacity, View, Text } from "react-native";

export default function TaskList({ taskList, styles, onRemove, onComplete }) {

    return (
        <View>
            {/* Si la liste de tâches est vide, affiche "No tasks" */}
            {taskList.length === 0 && <View><Text>No tasks</Text></View>}
            {/* Si la liste de tâches n'est pas vide, map chaque tâche de la liste et affiche-les */}
            {
                taskList.length > 0 && taskList.map((task, index) => {
                    return (<View style={styles.taskContainer} key={index}>
                        {/*  Quand on clique sur la tâche, appelle la fonction onComplete avec l'index comme argument */}
                        <TouchableOpacity onPress={() => onComplete(index)}>
                            <Text style={[styles.taskText, task.completed && styles.completed]}>{task.text}</Text>
                        </TouchableOpacity>
                        {/*  Quand on clique sur "Supprimer", appelle la fonction onRemove avec l'index comme argument */}
                        <TouchableOpacity onPress={() => onRemove(index)}>
                            <Text style={styles.removeButton}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>)

                })
            }
        </View>
    )

}
