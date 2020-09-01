import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addFood } from '../api/firestore';
import { TextField, ErrorAlert, Spinner } from '../components';
import { SPACING, COLOR, FONT_FAMILY, FONT_SIZE } from '../theme';
import { FOOD_LIST_SCREEN } from '../constants';
import { isAndroid, isIOS } from '../utils';
import commonStyles from './styles';
import i from '../i18n';

export default function AddFood({ navigation, route }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nameInput = useRef(null);
  const [name, setName] = useState({
    value: route.params?.name || '',
    error: null,
  });
  const [expiryDate, setExpiryDate] = useState(tomorrow);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nameInput?.current?.focus();
  }, []);

  const handleAddFood = () => {
    if (name.value.length === 0) {
      setName(state => ({ ...state, error: i.t('fillField') }));
      return;
    }
    setLoading(true);
    addFood(name.value, expiryDate)
      .then(() => {
        setLoading(false);
        navigation.navigate(FOOD_LIST_SCREEN);
      })
      .catch(error => {
        ErrorAlert(error.userInfo?.message);
        setLoading(false);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>{i.t('addFood')}</Text>
      <Text style={commonStyles.subTitle}>{i.t('enterFoodDetails')}</Text>
      <TextField
        inputRef={nameInput}
        style={styles.textField}
        onChangeText={text =>
          setName({
            error: text.length ? null : i.t('fillField'),
            value: text,
          })
        }
        value={name.value}
        error={name.error}
        placeholder={i.t('foodName')}
        returnKeyType="next"
      />
      {isAndroid && (
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextField
            inputRef={nameInput}
            style={styles.textField}
            value={expiryDate.toLocaleDateString()}
            placeholder={i.t('expiryDate')}
            editable={false}
          />
        </TouchableOpacity>
      )}
      {(isIOS || showDatePicker) && (
        <DateTimePicker
          value={expiryDate}
          minimumDate={tomorrow}
          onChange={(_, date) => {
            date && setExpiryDate(date);
            setShowDatePicker(false);
          }}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
        <Text style={styles.addButtonText}>{i.t('add')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    marginBottom: SPACING.MEDIUM,
  },
  addButton: {
    height: 52,
    justifyContent: 'center',
    backgroundColor: COLOR.PRIMARY,
    marginVertical: SPACING.LARGE,
  },
  addButtonText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
});
