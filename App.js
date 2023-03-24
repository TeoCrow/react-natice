// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './navigation/AppNavigation';



const Stack = createNativeStackNavigator();

function App() {
  return (
   <AppNavigation className="bg-red-500"></AppNavigation>
  );
}

export default App;