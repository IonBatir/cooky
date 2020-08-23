import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { ErrorAlert } from '../components';
import { deleteFood } from '../api/firestore';
import {
  COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  SPACING,
  FOOD_ITEM_HEIGHT,
} from '../theme';
import i from '../i18n';

const getMarkerColor = date => {
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 1) {
    return '#D32F2F';
  } else if (diffDays < 2) {
    return '#FBC02D';
  }
  return '#388E3C';
};

export default function FoodList({ id, name, expiryDate }) {
  return (
    <Swipeout
      autoClose
      backgroundColor={COLOR.WHITE}
      right={[
        {
          text: i.t('delete'),
          backgroundColor: COLOR.RED,
          type: 'delete',
          onPress: () =>
            deleteFood(id).catch(error => {
              ErrorAlert(error.userInfo?.message);
            }),
        },
      ]}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{expiryDate?.toLocaleDateString()}</Text>
        </View>
        <View
          style={[
            styles.marker,
            { backgroundColor: getMarkerColor(expiryDate) },
          ]}
        />
      </View>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    height: FOOD_ITEM_HEIGHT,
    marginHorizontal: SPACING.MEDIUM,
    marginVertical: SPACING.SMALL,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: { marginHorizontal: SPACING.MEDIUM },
  name: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    marginBottom: SPACING.EXTRA_SMALL,
  },
  date: {
    fontFamily: FONT_FAMILY.ITALIC,
    fontSize: FONT_SIZE.SMALL,
    color: COLOR.GREY,
  },
  marker: {
    width: 5,
    height: 30,
  },
});
