import {createStore} from 'redux';
import ToDoReducer from './ToDoReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, ToDoReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
