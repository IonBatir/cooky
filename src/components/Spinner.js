import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLOR } from '../theme';

export default function Spinner({ size = 'large' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND,
  },
});
