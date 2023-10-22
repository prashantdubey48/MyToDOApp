import React from 'react';
import MyToDo from './screens/MyToDo';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import { Text } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <MyToDo />
      </PersistGate>
    </Provider>
  );
};

export default App;
