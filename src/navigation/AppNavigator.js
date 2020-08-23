import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { AddFood, ScanFood } from '../screens';
import { TAB_NAVIGATOR, ADD_FOOD_SCREEN, SCAN_FOOD_SCREEN } from '../constants';

const AppNavigator = createStackNavigator();

export default function() {
  return (
    <AppNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AppNavigator.Screen name={TAB_NAVIGATOR} component={TabNavigator} />
      <AppNavigator.Screen name={ADD_FOOD_SCREEN} component={AddFood} />
      <AppNavigator.Screen name={SCAN_FOOD_SCREEN} component={ScanFood} />
    </AppNavigator.Navigator>
  );
}
