import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../screens';
import { DASHBOARD_SCREEN } from '../constants';

const AppStack = createStackNavigator();

export default function() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={DASHBOARD_SCREEN}
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}
