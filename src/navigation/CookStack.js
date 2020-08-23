import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Cook } from '../screens';
import { COOK_SCREEN } from '../constants';

const CookStack = createStackNavigator();

export default function() {
  return (
    <CookStack.Navigator>
      <CookStack.Screen
        name={COOK_SCREEN}
        component={Cook}
        options={{ headerShown: false }}
      />
    </CookStack.Navigator>
  );
}
