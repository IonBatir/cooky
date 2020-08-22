import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FoodList } from '../screens';
import RecipeStack from './RecipeStack';
import { FOOD_LIST_SCREEN, RECIPE_STACK } from '../constants';

const Tab = createBottomTabNavigator();

export default function() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={FOOD_LIST_SCREEN}
        component={FoodList}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: () => <Icon name="list" size={30} />,
        }}
      />
      <Tab.Screen
        name={RECIPE_STACK}
        component={RecipeStack}
        options={{
          tabBarLabel: 'Recipes',
          tabBarIcon: () => <Icon name="library-books" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
