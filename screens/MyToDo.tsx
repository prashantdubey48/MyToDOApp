import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  useColorScheme,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, addTask} from '../redux/ToDoAction';

const MyToDo = () => {
  const [task, setTask] = useState({});
  const [priority, setPriority] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [strings, setStrings] = useState({
    title: 'My ToDo App',
    priority: 'Priority',
    selected_priority: 'Selected Priority : ',
    edit: 'Edit',
    delete: 'Delete',
    add_task: 'Add Task',
    update_task: 'Update Task',
    enter_task: 'Enter Task',
    english: 'English',
    hindi: 'Hindi',
  });

  const tasks = useSelector(state => state.tasks);

  const dispatch = useDispatch();
  const handleAddTask = () => {
    if (task && priority) {
      if (editIndex !== -1) {
        // Edit existing task
        tasks[editIndex] = {task: task, priority: priority};
        dispatch(addTask(tasks, editIndex));
        setEditIndex(-1);
      } else {
        // Add new task
        dispatch(addTask({task: task, priority: priority}));
      }
      setTask('');
      setPriority('');
    } else {
      Alert.alert(`Please Enter ${task ? 'priority' : 'task'}`);
    }
  };

  const handleEditTask = index => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit?.task);
    setPriority(taskToEdit?.priority);
    setEditIndex(index);
  };

  const handleDeleteTask = task => {
    dispatch(deleteTask(task));
  };

  const changeLanguage = lang => {
    if (lang === 'hi') {
      setStrings({
        title: 'मेरा टूडू ऐप',
        priority: 'प्राथमिकता',
        selected_priority: 'चयनित प्राथमिकता : ',
        edit: 'संपादन',
        delete: 'मिटा',
        add_task: 'कार्य जोड़ें',
        update_task: 'कार्य अद्यतन करें',
        enter_task: 'कार्य दर्ज करें',
        english: 'अंग्रेज़ी',
        hindi: 'हिंदी',
      });
    } else {
      setStrings({
        title: 'My ToDo App',
        priority: 'Priority',
        selected_priority: 'Selected Priority : ',
        edit: 'Edit',
        delete: 'Delete',
        add_task: 'Add Task',
        update_task: 'Update Task',
        enter_task: 'Enter Task',
        english: 'English',
        hindi: 'Hindi',
      });
    }
  };

  const renderItem = ({item, index}) => (
    <View style={[styles.task, {backgroundColor: item?.priority}]}>
      <Text style={styles.itemList}>{item?.task}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>{strings.edit}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item.task)}>
          <Text style={styles.deleteButton}>{strings.delete}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPriorityView = color => {
    return (
      <TouchableOpacity onPress={() => setPriority(color)}>
        <View style={[styles.priorityView, {backgroundColor: color}]} />
      </TouchableOpacity>
    );
  };
  const colorScheme = useColorScheme();

  let lightTheme = {
    background: 'white',
    textColor: 'black',
  };
  let darkTheme = {
    background: 'black',
    textColor: 'white',
  };

  let textThemeWrapper = {
    color: colorScheme === 'light' ? lightTheme.textColor : darkTheme.textColor,
  };
  let backgroundThemeWrapper = {
    backgroundColor:
      colorScheme === 'light' ? lightTheme.background : darkTheme.background,
  };
  return (
    <ScrollView style={[styles.container, backgroundThemeWrapper]}>
      <Text style={[styles.title, textThemeWrapper]}>{strings.title}</Text>
      <View style={styles.column}>
        <TouchableOpacity onPress={() => changeLanguage('en')}>
          <Text style={textThemeWrapper}>{strings.english}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('hi')}>
          <Text style={textThemeWrapper}>{strings.hindi}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, textThemeWrapper]}
        placeholder={strings.enter_task}
        value={task}
        placeholderTextColor={'gray'}
        onChangeText={text => setTask(text)}
      />
      <Text style={textThemeWrapper}>{strings.priority}</Text>
      <View style={styles.column}>
        {renderPriorityView('green')}
        {renderPriorityView('yellow')}
        {renderPriorityView('red')}
      </View>
      {priority ? (
        <Text style={textThemeWrapper}>
          {strings.selected_priority}
          <Text style={{fontWeight: 'bold', color: priority, fontSize: 20}}>
            {priority.toLocaleUpperCase()}
          </Text>
        </Text>
      ) : (
        <></>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={[styles.addButtonText, textThemeWrapper]}>
          {editIndex !== -1 ? strings.update_task : strings.add_task}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 7,
    color: 'green',
  },
  input: {
    borderWidth: 1,
    paddingEnd: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    width: 300,
    marginEnd: 20,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
    alignSelf: 'center',
    margin: 10,
  },
  addButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
  },
  itemList: {
    fontSize: 19,
    color: 'black',
    width: 220,
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'blue',
  },
  deleteButton: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  priorityView: {
    height: 20,
    width: 20,
    margin: 10,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default MyToDo;
