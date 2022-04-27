import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {selecTodoDetail, closeTodoDetail} from './todoDetailSlice';
import {useDispatch, useSelector} from 'react-redux';
import {todoAdded, todoUpdated} from './todoSlice';
import {nanoid} from '@reduxjs/toolkit';

const TodoDetail = ({todoID}) => {
  const todo = useSelector(state =>
    state.todos.find(todo => todo.id === todoID),
  );
  const dispatch = useDispatch();
  const stateTodoDetail = useSelector(selecTodoDetail);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [content, setContent] = useState('');
  console.log(title);
  const reset = () => {
    setTitle('');
    setStart('');
    setEnd('');
    setContent('');
  };
  const add = () => {
    if (title && start && end && content) {
      dispatch(
        todoAdded({
          id: nanoid(),
          title,
          start,
          end,
          content,
          status: 0,
        }),
      );
      reset();
      dispatch(closeTodoDetail());
    } else {
      Alert.alert('Enter full informations');
    }
  };
  const update = () => {
    dispatch(todoUpdated({id: todoID, title, start, end, content}));
    reset();
    dispatch(closeTodoDetail());
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={stateTodoDetail}
      onRequestClose={() => {
        dispatch(closeTodoDetail());
      }}>
      <View style={styles.container}>
        <View style={styles.detailView}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontWeight: '700'}}>{todo ? 'Detail' : 'New todo'}</Text>
          </View>
          <TextInput
            placeholder="Title"
            style={styles.input}
            autoFocus={true}
            onChangeText={setTitle}>
            {todo ? todo.title : ''}
          </TextInput>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Start time"
              onChangeText={setStart}
              style={[styles.input, {width: '49%'}]}>
              {todo ? todo.start : ''}
            </TextInput>
            <TextInput
              placeholder="End time"
              onChangeText={setEnd}
              style={[styles.input, {width: '49%'}]}>
              {todo ? todo.end : ''}
            </TextInput>
          </View>
          <TextInput
            placeholder="Content"
            style={[styles.input, {height: 70}]}
            multiline={true}
            onChangeText={setContent}>
            {todo ? todo.content : ''}
          </TextInput>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => dispatch(closeTodoDetail())}>
              <Text>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={todo ? update : add}>
              <Text>{todo ? 'UPDATE' : 'ADD'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  detailView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,

    shadowColor: '#000',
    width: '80%',
    height: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },

});

export default TodoDetail;
