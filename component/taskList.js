import { TouchableOpacity, View, Text } from "react-native";

export default function TaskList({ taskList, styles, onRemove, onComplete }) {

    return (
        <View>
            {taskList.length === 0 && <View><Text>No tasks</Text></View>}
            {
                taskList.length > 0 && taskList.map((task, index) => {
                    return (<View style={styles.taskContainer} key={index}>
                        <TouchableOpacity onPress={() => onComplete(index)}>
                            <Text style={[styles.taskText, task.completed && styles.completed]}>{task.text}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onRemove(index)}>
                            <Text style={styles.removeButton}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>)

                })
            }
        </View>
    )

}