import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FoodList, AddFood } from '../screens';
import { FOOD_LIST_SCREEN, ADD_FOOD_SCREEN } from '../constants';

const FoodStack = createStackNavigator();

export default function() {
  return (
    <FoodStack.Navigator>
      <FoodStack.Screen
        name={FOOD_LIST_SCREEN}
        component={FoodList}
        options={{ headerShown: false }}
      />
      <FoodStack.Screen
        name={ADD_FOOD_SCREEN}
        component={AddFood}
        options={{ title: 'Add Food' }}
      />
    </FoodStack.Navigator>
  );
}
