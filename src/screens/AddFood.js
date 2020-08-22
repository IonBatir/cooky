import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Notifications } from 'react-native-notifications';
import { addFood } from '../api/firestore';
import { TextField, ErrorAlert, Spinner } from '../components';
import { SPACING, COLOR, FONT_FAMILY, FONT_SIZE } from '../theme';
import { FOOD_LIST_SCREEN } from '../constants';
import { isAndroid, isIOS } from '../utils';
import commonStyles from './styles';

export default function AddFood({ navigation, route }) {
  const nameInput = useRef(null);
  const [name, setName] = useState({
    value: route.params?.name || '',
    error: null,
  });
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nameInput?.current.focus();
  }, []);

  const handleAddFood = () => {
    if (name.value.length === 0) {
      setName(state => ({ ...state, error: 'Please fill out this field' }));
      return;
    }
    setLoading(true);
    addFood(name.value, expiryDate)
      .then(() => {
        setLoading(false);
        const fireDate = new Date(expiryDate.getTime());
        fireDate.setDate(expiryDate.getDate() - 1);
        Notifications.postLocalNotification({
          body: 'Cooky notification!',
          title: `${name.value} is about to expiry!`,
          sound: 'chime.aiff',
          category: 'REMINDERS',
          link: 'localNotificationLink',
          fireDate,
        });
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
      <Text style={commonStyles.title}>Add food!</Text>
      <Text style={commonStyles.subTitle}>
        Please enter food name and expiry date.
      </Text>
      <TextField
        inputRef={nameInput}
        style={styles.textField}
        onChangeText={text =>
          setName({
            error: text.length ? null : 'Please fill out this field',
            value: text,
          })
        }
        value={name.value}
        error={name.error}
        placeholder="Food name"
        returnKeyType="next"
      />
      {isAndroid && (
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextField
            inputRef={nameInput}
            style={styles.textField}
            value={expiryDate.toLocaleDateString()}
            placeholder="Expiry date"
            editable={false}
          />
        </TouchableOpacity>
      )}
      {(isIOS || showDatePicker) && (
        <DateTimePicker
          value={expiryDate}
          minimumDate={new Date()}
          onChange={(_, date) => {
            date && setExpiryDate(date);
            setShowDatePicker(false);
          }}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
        <Text style={styles.addButtonText}>ADD</Text>
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
