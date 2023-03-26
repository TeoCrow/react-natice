// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <AppNavigation></AppNavigation>
    </Provider>
  );
}

export default App;
