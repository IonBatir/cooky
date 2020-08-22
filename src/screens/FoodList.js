import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFood } from '../api/firestore';
import { FoodItem, ErrorAlert, Spinner } from '../components';
import {
  COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  SPACING,
  FOOD_ITEM_HEIGHT,
} from '../theme';
import { ADD_FOOD_SCREEN, SCAN_FOOD_SCREEN } from '../constants';
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
    <FoodItem id={item.id} name={item.name} expiryDate={item.expiryDate} />
  );

  const FAB = () => (
    <ActionButton
      buttonColor={COLOR.PRIMARY}
      renderIcon={() => <Icon name="add" size={40} color={COLOR.WHITE} />}>
      <ActionButton.Item
        title="Add Food"
        onPress={() => navigation.navigate(ADD_FOOD_SCREEN)}>
        <Icon name="create" size={30} color={COLOR.WHITE} />
      </ActionButton.Item>
      <ActionButton.Item
        title="Scan Food"
        onPress={() => navigation.navigate(SCAN_FOOD_SCREEN)}>
        <Icon name="center-focus-strong" size={30} color={COLOR.WHITE} />
      </ActionButton.Item>
    </ActionButton>
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
});
