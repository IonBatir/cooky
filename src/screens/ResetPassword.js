import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { resetPassword } from '../api/auth';
import { TextField, Spinner, ErrorAlert } from '../components';
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from '../theme';
import { LOGIN_SCREEN } from '../constants';
import commonStyles from './styles';
import i from '../i18n';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: null });
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: i.t('fillField') }));
      return;
    }

    setLoading(true);
    resetPassword(email.value)
      .then(() => {
        setLoading(false);
        Alert.alert(i.t('recoverPassword'), i.t('recoverPasswordMessage'), [
          { text: 'OK', onPress: () => navigation.navigate(LOGIN_SCREEN) },
        ]);
      })
      .catch(error => {
        setLoading(false);
        const { userInfo } = error;
        if (userInfo.code.includes('email')) {
          setEmail(state => ({ ...state, error: userInfo.message }));
          return;
        }
        ErrorAlert(userInfo.message);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{i.t('resetPassword')}</Text>
      <Text style={commonStyles.subTitle}>{i.t('enterEmail')}</Text>
      <TextField
        onChangeText={text => setEmail(state => ({ ...state, value: text }))}
        onFocus={() => setEmail(state => ({ ...state, error: null }))}
        onSubmitEditing={handleResetPassword}
        value={email.value}
        error={email.error}
        placeholder={i.t('email')}
        returnKeyType="go"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>{i.t('resetPassword')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    height: 52,
    justifyContent: 'center',
    backgroundColor: COLOR.PRIMARY,
    marginVertical: SPACING.LARGE,
  },
  resetButtonText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
});
