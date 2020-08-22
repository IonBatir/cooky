import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getRecipes } from '../api/firestore';
import { ErrorAlert, RecipeItem, Spinner, Header } from '../components';
import { RECIPE_ITEM_HEIGHT, SPACING, COLOR } from '../theme';
import { RECIPE_SCREEN } from '../constants';
import commonStyles from './styles';

export default function RecipeList({ navigation }) {
  const [recipes, setRecipes] = useState({ data: [], loading: true });

  useEffect(
    () =>
      getRecipes(
        data => setRecipes({ data, loading: false }),
        error => {
          ErrorAlert(error.userInfo?.message);
          setRecipes({ data: [], loading: false });
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

  if (recipes.loading) {
    return <Spinner />;
  }

  return recipes.data.length === 0 ? (
    <View style={styles.container}>
      <View style={commonStyles.centerContainer}>
        <Text style={commonStyles.text}>No recipes yet. Add some recipes!</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Header text="Recipes" />
      <View style={styles.list}>
        <FlatList
          data={recipes.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          getItemLayout={(_, index) => ({
            length: RECIPE_ITEM_HEIGHT,
            offset: RECIPE_ITEM_HEIGHT * index,
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
