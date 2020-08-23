import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components';
import { COLOR } from '../theme';

export default function Cook() {
  return (
    <View style={styles.container}>
      <Header text="What can I cook?" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },
});
