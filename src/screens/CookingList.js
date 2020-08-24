import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Header, ErrorAlert, Spinner, RecipeItem } from '../components';
import { getCook } from '../api/firestore';
import { COLOR, LIST_ITEM_HEIGHT, SPACING } from '../theme';
import commonStyles from './styles';
import i from '../i18n';

export default function CookingList({ navigation }) {
  const [cook, setCook] = useState({ data: [], loading: true });

  useEffect(
    () =>
      getCook(
        data => setCook({ data, loading: false }),
        error => {
          setCook({ data: [], loading: false });
          ErrorAlert(error.userInfo?.message);
        },
      ),
    [],
  );

  const renderItem = ({ item }) => (
    <RecipeItem
      name={item.name}
      handlePress={() => navigation.navigate(RECIPE_SCREEN, { ...item })}
    />
  );

  if (cook.loading) {
    return <Spinner />;
  }

  return cook.data.length === 0 ? (
    <View style={styles.container}>
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>{i.t('noCook')}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Header text={i.t('cook')} />
      <View style={styles.list}>
        <FlatList
          data={cook.data}
          renderItem={renderItem}
          keyExtractor={item => item.recipeId}
          getItemLayout={(_, index) => ({
            length: LIST_ITEM_HEIGHT,
            offset: LIST_ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
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
