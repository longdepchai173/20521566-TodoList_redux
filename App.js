import React from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/app/store';
import TodoList from './src/features/TodoList';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoList />
      </PersistGate>
    </Provider>
  );
};
export default App;
