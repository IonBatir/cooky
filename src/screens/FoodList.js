import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import i from '../i18n';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFood } from '../api/firestore';
import { FoodItem, ErrorAlert, Spinner, Header } from '../components';
import { COLOR, SPACING, LIST_ITEM_HEIGHT } from '../theme';
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

  const FAB = () => (
    <ActionButton
      buttonColor={COLOR.PRIMARY}
      renderIcon={() => <Icon name="add" size={40} color={COLOR.WHITE} />}>
      <ActionButton.Item
        title={i.t('addFood')}
        onPress={() => navigation.navigate(ADD_FOOD_SCREEN)}>
        <Icon name="create" size={30} color={COLOR.WHITE} />
      </ActionButton.Item>
      <ActionButton.Item
        title={i.t('scanBarcode')}
        onPress={() => navigation.navigate(SCAN_FOOD_SCREEN)}>
        <Icon name="center-focus-strong" size={30} color={COLOR.WHITE} />
      </ActionButton.Item>
    </ActionButton>
  );

  const renderItem = ({ item }) => (
    <FoodItem id={item.id} name={item.name} expiryDate={item.expiryDate} />
  );

  if (food.loading) {
    return <Spinner />;
  }

  return food.data.length === 0 ? (
    <View style={styles.container}>
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>{i.t('noFood')}</Text>
      </View>
      <FAB />
    </View>
  ) : (
    <View style={styles.container}>
      <Header text={i.t('food')} />
      <View style={styles.list}>
        <FlatList
          data={food.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          getItemLayout={(_, index) => ({
            length: LIST_ITEM_HEIGHT,
            offset: LIST_ITEM_HEIGHT * index,
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
  list: {
    flex: 1,
    marginTop: SPACING.MEDIUM,
  },
});
