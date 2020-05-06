import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from './src/api/auth';
import { AuthStack, AppNavigator } from './src/navigation';
import { Spinner } from './src/components';
import { AUTH_STACK, APP_NAVIGATOR } from './src/constants';

const MainStack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({ value: null, loading: true });

  useEffect(
    () => onAuthStateChanged(usr => setUser({ value: usr, loading: false })),
    [],
  );

  return user.loading ? (
    <Spinner />
  ) : (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <NavigationContainer>
        <MainStack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName={user.value ? APP_NAVIGATOR : AUTH_STACK}>
          <MainStack.Screen name={AUTH_STACK} component={AuthStack} />
          <MainStack.Screen name={APP_NAVIGATOR} component={AppNavigator} />
        </MainStack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
