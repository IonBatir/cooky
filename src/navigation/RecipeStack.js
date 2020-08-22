import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RecipeList } from '../screens';
import { RECIPE_LIST_SCREEN } from '../constants';

const RecipeStack = createStackNavigator();

export default function() {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name={RECIPE_LIST_SCREEN}
        component={RecipeList}
        options={{ headerShown: false }}
      />
    </RecipeStack.Navigator>
  );
}
