import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FOOD_LIST_SCREEN,
  RECIPE_LIST_SCREEN,
  PROFILE_SCREEN,
} from '../constants';
import { FoodList, RecipeList, Profile } from '../screens';

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
        name={RECIPE_LIST_SCREEN}
        component={RecipeList}
        options={{
          tabBarLabel: 'Recipe',
          tabBarIcon: () => <Icon name="library-books" size={30} />,
        }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Icon name="account-box" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}