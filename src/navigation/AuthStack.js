import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register, ResetPassword } from '../screens';
import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  RESET_PASSWORD_SCREEN,
} from '../constants';
import i from '../i18n';

const AuthStack = createStackNavigator();

export default function() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={LOGIN_SCREEN}
        component={Login}
        options={{ headerShown: false, title: i.t('login') }}
      />
      <AuthStack.Screen
        name={REGISTER_SCREEN}
        component={Register}
        options={{ title: i.t('register') }}
      />
      <AuthStack.Screen
        name={RESET_PASSWORD_SCREEN}
        component={ResetPassword}
        options={{ title: i.t('resetPassword') }}
      />
    </AuthStack.Navigator>
  );
}
