import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { login } from '../api/auth';
import { TextField, Spinner, ErrorAlert } from '../components';
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from '../theme';
import {
  RESET_PASSWORD_SCREEN,
  REGISTER_SCREEN,
  APP_NAVIGATOR,
} from '../constants';
import commonStyles from './styles';
import i from '../i18n';

export default function Login({ navigation }) {
  const passwordInput = useRef(null);
  const [email, setEmail] = useState({ value: '', error: null });
  const [password, setPassword] = useState({ value: '', error: null });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: i.t('fillField') }));
      return;
    }
    if (password.value.length === 0) {
      setPassword(state => ({ ...state, error: i.t('fillField') }));
      return;
    }

    setLoading(true);
    login(email.value, password.value)
      .then(() => navigation.navigate(APP_NAVIGATOR))
      .catch(error => {
        setLoading(false);
        const { userInfo } = error;
        if (userInfo.code.includes('email')) {
          setEmail(state => ({ ...state, error: userInfo.message }));
          return;
        }
        if (userInfo.code.includes('password')) {
          setPassword(state => ({ ...state, error: userInfo.message }));
          return;
        }
        ErrorAlert(userInfo.message);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{i.t('welcome')}</Text>
      <Text style={commonStyles.subTitle}>{i.t('pleaseLogin')}</Text>
      <TextField
        style={styles.textField}
        onChangeText={text => setEmail(state => ({ ...state, value: text }))}
        onFocus={() => setEmail(state => ({ ...state, error: null }))}
        onSubmitEditing={() => passwordInput.current.focus()}
        value={email.value}
        error={email.error}
        placeholder={i.t('email')}
        returnKeyType="next"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextField
        inputRef={passwordInput}
        onChangeText={text => setPassword(state => ({ ...state, value: text }))}
        onFocus={() => setPassword(state => ({ ...state, error: null }))}
        onSubmitEditing={handleLogin}
        value={password.value}
        error={password.error}
        placeholder={i.t('password')}
        returnKeyType="go"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(RESET_PASSWORD_SCREEN)}>
        <Text style={styles.forgotButtonText}>{i.t('forgot')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>{i.t('login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
        <Text style={styles.registerButtonText}>{i.t('register')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    marginBottom: SPACING.MEDIUM,
  },
  loginButton: {
    height: 52,
    justifyContent: 'center',
    backgroundColor: COLOR.PRIMARY,
    marginVertical: SPACING.LARGE,
  },
  loginButtonText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  registerButtonText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.GREY,
    textAlign: 'center',
  },
  forgotButtonText: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    color: '#0052FF',
    textAlign: 'right',
    marginTop: SPACING.SMALL,
  },
});
