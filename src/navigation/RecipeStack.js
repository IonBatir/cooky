import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RecipeList, Recipe, AddRecipe } from '../screens';
import {
  RECIPE_LIST_SCREEN,
  RECIPE_SCREEN,
  ADD_RECIPE_SCREEN,
} from '../constants';
import i from '../i18n';

const RecipeStack = createStackNavigator();

export default function() {
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name={RECIPE_LIST_SCREEN}
        component={RecipeList}
        options={{ headerShown: false }}
      />
      <RecipeStack.Screen
        name={RECIPE_SCREEN}
        component={Recipe}
        options={({ route }) => ({ title: route.params.name })}
      />
      <RecipeStack.Screen
        name={ADD_RECIPE_SCREEN}
        component={AddRecipe}
        options={{ title: i.t('addRecipe') }}
      />
    </RecipeStack.Navigator>
  );
}
