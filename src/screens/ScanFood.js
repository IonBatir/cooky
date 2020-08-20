import React from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { FONT_FAMILY, FONT_SIZE, SPACING, COLOR } from '../theme';

const PLACEHOLDER_WIDTH = Dimensions.get('screen').width - 2 * SPACING.MEDIUM;

const BORDER_WIDTH = 5;

export default function ScanFood({ navigation }) {
  const [loading, setLoading] = React.useState(false);

  const squareStyle = StyleSheet.flatten([
    styles.square,
    { borderColor: loading ? COLOR.PRIMARY : COLOR.WHITE },
  ]);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          if (barcodes.length) setLoading(true);
          console.log(barcodes);
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.overlayView}>
          <Text style={styles.scanText}>Scan BarCode</Text>
          <View style={styles.placeholder}>
            <View style={[squareStyle, styles.leftTopBorder]} />
            <View style={[squareStyle, styles.rightTopBorder]} />
            <View style={[squareStyle, styles.leftBottomBorder]} />
            <View style={[squareStyle, styles.rightBottomBorder]} />
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    height: '100%',
  },
  overlayView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanText: {
    fontFamily: FONT_FAMILY.ITALIC,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
    alignSelf: 'center',
    marginBottom: SPACING.EXTRA_LARGE,
  },
  placeholder: {
    alignSelf: 'center',
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH / 1.5,
    marginHorizontal: SPACING.MEDIUM,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    borderLeftWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
  },
  rightTopBorder: {
    right: 0,
    top: 0,
    borderRightWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
  },
  leftBottomBorder: {
    left: 0,
    bottom: 0,
    borderLeftWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },
  rightBottomBorder: {
    right: 0,
    bottom: 0,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },
  backButton: {
    position: 'absolute',
    right: SPACING.EXTRA_LARGE,
    bottom: 50,
  },
  backButtonText: {
    fontFamily: FONT_FAMILY.LIGHT,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
  },
});
