import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack, AppStack } from './src/navigation';
import { AUTH_STACK, APP_STACK } from './src/constants';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator mode="modal">
        <MainStack.Screen name={AUTH_STACK} component={AppStack} />
        <MainStack.Screen name={APP_STACK} component={AuthStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
