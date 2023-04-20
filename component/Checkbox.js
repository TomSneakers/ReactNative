import { Text, TouchableOpacity } from "react-native";
export const toggleCompleted = (index) => {
    const [taskList, setTaskList] = useState([]);
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
    saveTasks(updatedTaskList);
    return (
        <TouchableOpacity onPress={() => toggleCompleted(index)}>
            <Text style={[styles.taskText, task.completed && styles.completed]}></Text>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    taskText: {
        fontSize: 18,
        marginRight: 10,
    },
    completed: {
        textDecorationLine: 'line-through',
    },
})