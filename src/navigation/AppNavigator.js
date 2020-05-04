import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FoodStack } from './';
import { FOOD_STACK } from '../constants';

const AppNavigator = createBottomTabNavigator();

export default function() {
  return (
    <AppNavigator.Navigator>
      <AppNavigator.Screen
        name={FOOD_STACK}
        component={FoodStack}
        options={{ tabBarVisible: false }}
      />
    </AppNavigator.Navigator>
  );
}
