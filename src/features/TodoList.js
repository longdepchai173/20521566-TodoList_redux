import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  closeTodoDetail,
  openTodoDetail,
  selecTodoDetail,
} from './todoDetailSlice';
import {todoDeleted, todoCompleted} from './todoSlice';
import {useDispatch, useSelector} from 'react-redux';
import TodoDetail from './TodoDetail';

const TodoList = () => {
  //const stateTodoDetail = useSelector(selecTodoDetail);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [todoID, setTodoID] = useState(0);
  const openByID = id => {
    setTodoID(id);
    dispatch(openTodoDetail());
  };

  const newTodo = () => {
    setTodoID(null);
    dispatch(openTodoDetail());
  };
  return (
    <View style={styles.container}>
      <TodoDetail todoID={todoID} />
      <View style={styles.title}>
        <Text style={styles.TextTitle}>Todos</Text>
      </View>
      <ScrollView>
        {todos.map((todo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.todoLayout}
            onPress={() => openByID(todo.id)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => dispatch(todoCompleted(todo.id))}>
                <Image
                  style={{width: 25, height: 25}}
                  source={
                    todo.status == 0
                      ? require('../../assets/uncheck.png')
                      : require('../../assets/check.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 5}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontWeight: '700'}}>
                  {' '}
                  Title: <Text style={{fontWeight: '500'}}>{todo.title} </Text>
                </Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                <Text style={{fontWeight: '700'}}>
                  {' '}
                  Start:
                  <Text style={{fontWeight: '500'}}>{todo.start}</Text>
                </Text>
                <Text style={{fontWeight: '700'}}>
                  end: <Text style={{fontWeight: '500'}}>{todo.end} </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => dispatch(todoDeleted(todo.id))}>
                <Text style={{fontSize: 25}}>❌</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height: 70}}></View>
      </ScrollView>

      <TouchableOpacity style={styles.btnAdd} onPress={() => newTodo()}>
        <Text style={{fontSize: 30}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoLayout: {
    height: 80,
    borderWidth: 1,
    marginBottom: 8,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  btnAdd: {
    backgroundColor: 'orange',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    bottom: 20,
    right: 20,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 0.5,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: 'orange',
  },
});
export default TodoList;
