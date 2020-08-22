import React, { useRef, useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ErrorAlert, Spinner } from '../components';
import { FONT_FAMILY, FONT_SIZE, SPACING, COLOR } from '../theme';
import { getBarcode } from '../api/firestore';
import { ADD_FOOD_SCREEN } from '../constants';

const PLACEHOLDER_WIDTH = Dimensions.get('screen').width - 2 * SPACING.MEDIUM;

const BORDER_WIDTH = 5;

const STATUS = { PREVIEW: 'PREVIEW', DETECTED: 'DETECTED', ERROR: 'ERROR' };

const getBorderColor = status => {
  switch (status) {
    case STATUS.PREVIEW:
      return COLOR.WHITE;
    case STATUS.DETECTED:
      return COLOR.PRIMARY;
    case STATUS.ERROR:
      return COLOR.RED;
    default:
      return COLOR.WHITE;
  }
};

export default function ScanFood({ navigation }) {
  const camera = useRef();
  const [status, setStatus] = useState(STATUS.PREVIEW);

  const squareStyle = StyleSheet.flatten([
    styles.square,
    { borderColor: getBorderColor(status) },
  ]);

  const handleBardCodeDetected = ({ barcodes }) => {
    const barcode = barcodes[0]?.data;
    if (barcode && status === STATUS.PREVIEW) {
      setStatus(STATUS.DETECTED);
      camera.current.pausePreview();
      getBarcode(barcode)
        .then(({ name }) => {
          setStatus(status.PREVIEW);
          camera.current.resumePreview();
          navigation.navigate(ADD_FOOD_SCREEN, { name });
        })
        .catch(error => {
          setStatus(STATUS.ERROR);
          ErrorAlert(
            error.userInfo?.message,
            () => {
              setStatus(STATUS.PREVIEW);
              camera.current.resumePreview();
            },
            () => {
              navigation.goBack();
            },
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        captureAudio={false}
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={handleBardCodeDetected}
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
      {status === STATUS.DETECTED && (
        <View style={styles.overlay}>
          <Spinner />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayView: {
    flex: 1,
    justifyContent: 'center',
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
