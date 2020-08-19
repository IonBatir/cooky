import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FONT_FAMILY, FONT_SIZE, SPACING, COLOR, DEBUG } from '../theme';

const PLACEHOLDER_WIDTH = Dimensions.get('screen').width - 2 * SPACING.MEDIUM;

export default function ScanFood({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.scanText}>Scan BarCode</Text>
      <View style={styles.placeholder}>
        <View style={[styles.square, styles.leftTopBorder]} />
        <View style={[styles.square, styles.rightTopBorder]} />
        <View style={[styles.square, styles.leftBottomBorder]} />
        <View style={[styles.square, styles.rightBottomBorder]} />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Scan');
          }}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR.BLACK,
  },
  scanText: {
    fontFamily: FONT_FAMILY.ITALIC,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
    alignSelf: 'center',
  },
  placeholder: {
    alignSelf: 'center',
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH / 1.5,
    marginHorizontal: SPACING.MEDIUM,
    backgroundColor: 'transparent',
  },
  square: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: COLOR.WHITE,
  },
  leftTopBorder: {
    left: 0,
    top: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  rightTopBorder: {
    right: 0,
    top: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  leftBottomBorder: {
    left: 0,
    bottom: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  rightBottomBorder: {
    right: 0,
    bottom: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 40,
    borderWidth: 5,
    borderColor: COLOR.WHITE,
  },
  backButton: { position: 'absolute', right: SPACING.LARGE },
  backButtonText: {
    fontFamily: FONT_FAMILY.LIGHT,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
  },
});
