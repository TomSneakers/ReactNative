// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './tabs/bottom';
import Route from './route/route';
import CaseContext from './context/CaseContext';


function App() {
  return (
    <CaseContext>
      <Route />
    </CaseContext>
  );
}

export default App;