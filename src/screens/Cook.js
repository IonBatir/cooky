import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../components';
import { COLOR } from '../theme';
import i from '../i18n';

export default function Cook() {
  return (
    <View style={styles.container}>
      <Header text={i.t('cook')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },
});
