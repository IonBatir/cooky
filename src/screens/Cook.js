import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cook() {
  return (
    <View style={styles.container}>
      <Text>Cook</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
