import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { register } from '../api/auth';
import { Spinner, TextField, ErrorAlert } from '../components';
import { SPACING, FONT_FAMILY, FONT_SIZE, COLOR } from '../theme';
import { APP_NAVIGATOR } from '../constants';
import commonStyles from './styles';
import i from '../i18n';

export default function Register({ navigation }) {
  const passwordInput = useRef(null);
  const passwordConfirmInput = useRef(null);
  const [email, setEmail] = useState({ value: '', error: null });
  const [password, setPassword] = useState({ value: '', error: null });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: null,
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (email.value.length === 0) {
      setEmail(state => ({ ...state, error: i.t('fillField') }));
      return;
    }
    if (password.value.length === 0) {
      setPassword(state => ({ ...state, error: i.t('fillField') }));
      return;
    }
    if (password.value !== confirmPassword.value) {
      setConfirmPassword(state => ({
        ...state,
        error: i.t('noMatchPassword'),
      }));
      return;
    }

    setLoading(true);
    register(email.value, password.value)
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
      <Text style={commonStyles.title}>{i.t('register')}</Text>
      <Text style={commonStyles.subTitle}>{i.t('enterProfileDetails')}</Text>
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
        style={styles.textField}
        inputRef={passwordInput}
        onChangeText={text => setPassword(state => ({ ...state, value: text }))}
        onFocus={() => setPassword(state => ({ ...state, error: null }))}
        onSubmitEditing={() => passwordConfirmInput.current.focus()}
        value={password.value}
        error={password.error}
        placeholder={i.t('password')}
        returnKeyType="next"
        autoCompleteType="password"
        textContentType="newPassword"
        secureTextEntry
      />
      <TextField
        inputRef={passwordConfirmInput}
        onChangeText={text => {
          setConfirmPassword(state => ({ ...state, value: text }));
        }}
        onFocus={() => setConfirmPassword(state => ({ ...state, error: null }))}
        onSubmitEditing={handleRegister}
        value={confirmPassword.value}
        error={confirmPassword.error}
        placeholder={i.t('confirmPassword')}
        returnKeyType="go"
        autoCompleteType="password"
        textContentType="newPassword"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>{i.t('register')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    marginBottom: SPACING.MEDIUM,
  },
  registerButton: {
    height: 52,
    justifyContent: 'center',
    backgroundColor: COLOR.PRIMARY,
    marginVertical: SPACING.LARGE,
  },
  registerButtonText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
});
