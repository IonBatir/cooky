import 'react-native-gesture-handler';
import React, { useRef, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from './src/api/auth';
import { AuthStack, AppStack } from './src/navigation';
import { Spinner } from './src/components';
import { AUTH_STACK, APP_STACK } from './src/constants';

const MainStack = createStackNavigator();

export default function App() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(user => {
        if (loading) {
          setLoading(false);
        } else {
          ref.current?.navigate(user ? APP_STACK : AUTH_STACK);
        }
      }),
    [loading],
  );

  return loading ? (
    <Spinner />
  ) : (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <NavigationContainer ref={ref}>
        <MainStack.Navigator mode="modal" headerMode="none">
          <MainStack.Screen name={AUTH_STACK} component={AuthStack} />
          <MainStack.Screen name={APP_STACK} component={AppStack} />
        </MainStack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
