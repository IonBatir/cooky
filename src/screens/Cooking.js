import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ErrorAlert, Spinner } from '../components';
import { getRecipe } from '../api/firestore';
import { SPACING, COLOR, FONT_FAMILY, FONT_SIZE } from '../theme';
import commonStyles from './styles';
import i from '../i18n';

export default function Cooking({ route }) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState({ data: null, loading: true });

  useEffect(() => {
    getRecipe(recipeId)
      .then(data => setRecipe({ data, loading: false }))
      .catch(error => {
        setRecipe({ data: null, loading: false });
        ErrorAlert(error.userInfo?.message);
      });
  }, [recipeId]);

  if (recipe.loading) {
    return <Spinner />;
  }

  return recipe.data === null ? (
    <View style={commonStyles.centerContainer}>
      <Text>{i.t('noRecipe')}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{i.t('need')}</Text>
      {recipe.data.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.listItem}>
          {`${index + 1}. ${ingredient}`}
        </Text>
      ))}
      <Text style={styles.listTitle}>{i.t('algorithmCook')}</Text>
      <Text style={styles.listItem}>{recipe.data.algorithm}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
    backgroundColor: COLOR.BACKGROUND,
  },
  listTitle: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    marginTop: SPACING.MEDIUM,
    marginBottom: SPACING.SMALL,
  },
  listItem: { fontFamily: FONT_FAMILY.ITALIC, fontSize: FONT_SIZE.MEDIUM },
});
