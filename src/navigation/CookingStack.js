import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CookingList, Cooking } from '../screens';
import { COOKING_LIST_SCREEN, COOKING_SCREEN } from '../constants';

const CookStack = createStackNavigator();

export default function() {
  return (
    <CookStack.Navigator>
      <CookStack.Screen
        name={COOKING_LIST_SCREEN}
        component={CookingList}
        options={{ headerShown: false }}
      />
      <CookStack.Screen
        name={COOKING_SCREEN}
        component={Cooking}
        options={({ route }) => ({ title: route.params.name })}
      />
    </CookStack.Navigator>
  );
}
