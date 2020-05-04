import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FoodItem } from '../components';
import {
  COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  SPACING,
  FOOD_ITEM_HEIGHT,
} from '../theme';
import { ADD_FOOD_SCREEN } from '../constants';

const dummyFood = [
  { id: '1', name: 'Lapte ZUZU', date: '28/05/2020' },
  { id: '2', name: 'Mere', date: '30/05/2020' },
  { id: '3', name: 'Pate', date: '28/05/2022' },
];

export default function FoodList({ navigation }) {
  const renderItem = ({ item }) => (
    <FoodItem name={item.name} date={item.date} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food List</Text>
      </View>
      <View style={styles.foodList}>
        <FlatList
          data={dummyFood}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: FOOD_ITEM_HEIGHT,
            offset: FOOD_ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(ADD_FOOD_SCREEN)}>
        <View style={styles.addButton}>
          <View style={styles.addButtonHorizontalLine} />
          <View style={styles.addButtonVerticalLine} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    backgroundColor: COLOR.PRIMARY,
  },
  headerText: {
    fontFamily: FONT_FAMILY.ITALIC,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    color: COLOR.WHITE,
    padding: SPACING.MEDIUM,
  },
  foodList: {
    flex: 1,
    marginTop: SPACING.MEDIUM,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: SPACING.LARGE,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLOR.PRIMARY,
  },
  addButtonHorizontalLine: {
    position: 'absolute',
    width: 40,
    height: 2,
    backgroundColor: COLOR.WHITE,
  },
  addButtonVerticalLine: {
    position: 'absolute',
    width: 2,
    height: 40,
    backgroundColor: COLOR.WHITE,
  },
});
