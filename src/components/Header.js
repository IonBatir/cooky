import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLOR, FONT_FAMILY, FONT_SIZE, SPACING } from '../theme';

export default function Header({ text }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: getStatusBarHeight() + 50,
    backgroundColor: COLOR.PRIMARY,
  },
  headerText: {
    fontFamily: FONT_FAMILY.ITALIC,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
    padding: SPACING.MEDIUM,
  },
});
