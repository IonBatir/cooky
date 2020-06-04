import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SPACING, COLOR } from '../theme';

export default function ScanFood() {
  return (
    <View style={styles.container}>
      <Text style={styles.scanText}>Scan BarCode</Text>
      <View style={styles.square} />
      <View style={styles.button}>
        <Text style={styles.buttonText}>SCAN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR.BLACK,
  },
  scanText: {
    alignSelf: 'center',
    fontFamily: FONT_FAMILY.ITALIC,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
    marginTop: SPACING.EXTRA_LARGE,
  },
  square: {
    width: 300,
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: COLOR.WHITE,
    borderWidth: 5,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
    marginBottom: SPACING.EXTRA_LARGE,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
});
