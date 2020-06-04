import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getFood } from '../api/firestore';
import { FoodItem, ErrorAlert, Spinner } from '../components';
import {
  COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  SPACING,
  FOOD_ITEM_HEIGHT,
} from '../theme';
import { ADD_FOOD_SCREEN } from '../constants';
import commonStyles from './styles';

export default function FoodList({ navigation }) {
  const [food, setFood] = useState({ data: [], loading: true });

  useEffect(
    () =>
      getFood(
        data => setFood({ data, loading: false }),
        error => {
          ErrorAlert(error.userInfo?.message);
          setFood({ data: [], loading: false });
        },
      ),
    [],
  );

  const renderItem = ({ item }) => (
    <FoodItem name={item.name} expiryDate={item.expiryDate} />
  );

  const FAB = () => (
    <TouchableOpacity onPress={() => navigation.navigate(ADD_FOOD_SCREEN)}>
      <View style={styles.addButton}>
        <View style={styles.addButtonHorizontalLine} />
        <View style={styles.addButtonVerticalLine} />
      </View>
    </TouchableOpacity>
  );

  if (food.loading) {
    return <Spinner />;
  }

  return food.data.length === 0 ? (
    <View style={styles.container}>
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>No food yet. Add some food!</Text>
      </View>
      <FAB />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food List</Text>
      </View>
      <View style={styles.foodList}>
        <FlatList
          data={food.data}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: FOOD_ITEM_HEIGHT,
            offset: FOOD_ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
      <FAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
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
