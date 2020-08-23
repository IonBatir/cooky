import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, COLOR, FONT_FAMILY, FONT_SIZE } from '../theme';

export default function Recipe({ route }) {
  const { ingredients, algorithm } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>What do you need?</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.listItem}>
          {`${index + 1}. ${ingredient}`}
        </Text>
      ))}
      <Text style={styles.listTitle}>How to cook?</Text>
      <Text style={styles.listItem}>{algorithm}</Text>
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
