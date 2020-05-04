import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  SPACING,
  FOOD_ITEM_HEIGHT,
} from '../theme';

export default function FoodList({ name, date }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={[styles.marker, { backgroundColor: COLOR.GREY }]} />
    </View>
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
  content: { marginLeft: SPACING.MEDIUM },
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
    backgroundColor: '#F96060',
  },
});
