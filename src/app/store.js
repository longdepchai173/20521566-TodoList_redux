import {configureStore} from '@reduxjs/toolkit';
import todoDetailReducer from '../features/todoDetailSlice';
import todoReducer from '../features/todoSlice';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }
const reducer= combineReducers({
    todoDetail: todoDetailReducer,
    todos: todoReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})

export let persistor = persistStore(store)

export default store

