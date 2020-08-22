import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RecipeList, Recipe } from '../screens';
import { RECIPE_LIST_SCREEN, RECIPE_SCREEN } from '../constants';

const RecipeStack = createStackNavigator();

export default function() {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name={RECIPE_LIST_SCREEN}
        component={RecipeList}
        options={{ headerShown: false }}
      />
      <RecipeStack.Screen name={RECIPE_SCREEN} component={Recipe} />
    </RecipeStack.Navigator>
  );
}
