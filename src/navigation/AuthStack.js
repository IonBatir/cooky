import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register, ForgotPassword } from '../screens';
import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  FORGOT_PASSWORD_SCREEN,
} from '../constants';

const AuthStack = createStackNavigator();

export default function() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={LOGIN_SCREEN} component={Login} />
      <AuthStack.Screen name={REGISTER_SCREEN} component={Register} />
      <AuthStack.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
    </AuthStack.Navigator>
  );
}
