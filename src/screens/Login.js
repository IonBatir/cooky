import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { login } from '../api/auth';
import { TextField, Spinner, ErrorAlert } from '../components';
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from '../theme';
import {
  RESET_PASSWORD_SCREEN,
  REGISTER_SCREEN,
  DASHBOARD_SCREEN,
} from '../constants';
import commonStyles from './styles';

export default function Login({ navigation }) {
  const passwordInput = useRef(null);
  const [email, setEmail] = useState({ value: '', error: null });
  const [password, setPassword] = useState({ value: '', error: null });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: 'Please fill out this field' }));
      return;
    }
    if (password.value.length === 0) {
      setPassword(state => ({ ...state, error: 'Please fill out this field' }));
      return;
    }

    setLoading(true);
    login(email.value, password.value)
      .then(() => navigation.navigate(DASHBOARD_SCREEN))
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
      <Text style={commonStyles.title}>Welcome!</Text>
      <Text style={commonStyles.subTitle}>Please login to your profile.</Text>
      <TextField
        style={styles.textField}
        onChangeText={text => setEmail(state => ({ ...state, value: text }))}
        onFocus={() => setEmail(state => ({ ...state, error: null }))}
        onSubmitEditing={() => passwordInput.current.focus()}
        value={email.value}
        error={email.error}
        placeholder="Email Address"
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
        placeholder="Password"
        returnKeyType="go"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(RESET_PASSWORD_SCREEN)}>
        <Text style={styles.forgotButtonText}>Forgot?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
        <Text style={styles.registerButtonText}>REGISTER NOW</Text>
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
  },
});
