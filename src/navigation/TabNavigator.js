import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FoodList } from '../screens';
import CookStack from './CookStack';
import RecipeStack from './RecipeStack';
import { FOOD_LIST_SCREEN, RECIPE_STACK, COOK_STACK } from '../constants';
import i from '../i18n';

const Tab = createBottomTabNavigator();

export default function() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={FOOD_LIST_SCREEN}
        component={FoodList}
        options={{
          tabBarLabel: i.t('food'),
          tabBarIcon: () => <Icon name="list" size={30} />,
        }}
      />
      <Tab.Screen
        name={COOK_STACK}
        component={CookStack}
        options={{
          tabBarLabel: i.t('cooking'),
          tabBarIcon: () => <Icon name="restaurant" size={30} />,
        }}
      />
      <Tab.Screen
        name={RECIPE_STACK}
        component={RecipeStack}
        options={{
          tabBarLabel: i.t('recipes'),
          tabBarIcon: () => <Icon name="library-books" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}
