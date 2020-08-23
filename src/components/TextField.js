import React from 'react';
import { Platform, View, TextInput, Text, StyleSheet } from 'react-native';
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from '../theme';

export default function TextField({ inputRef, style, error, ...other }) {
  return (
    <View style={[styles.input, style, error && styles.inputError]}>
      <TextInput ref={inputRef} style={styles.inputText} {...other} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(112, 112, 112, 0.5)',
    paddingBottom: Platform.OS === 'ios' ? SPACING.SMALL : 0,
  },
  inputError: {
    borderBottomColor: COLOR.RED,
  },
  inputText: {
    flex: 1,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.GREY,
  },
  errorText: {
    fontFamily: FONT_FAMILY.LIGHT_ITALIC,
    fontSize: FONT_SIZE.EXTRA_EXTRA_SMALL,
    color: COLOR.RED,
  },
});
