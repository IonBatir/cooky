import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextField, ErrorAlert, Spinner } from '../components';
import { addRecipe } from '../api/firestore';
import { SPACING, COLOR, FONT_FAMILY, FONT_SIZE } from '../theme';
import commonStyles from './styles';
import { RECIPE_LIST_SCREEN } from '../constants';
import i from '../i18n';

export default function AddRecipe({ navigation }) {
  const nameInput = useRef(null);
  const [name, setName] = useState({ value: '', error: null });
  const [ingredients, setIngredients] = useState([{ value: '', error: null }]);
  const [algorithm, setAlgorithm] = useState({ value: '', error: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nameInput?.current?.focus();
  }, []);

  const handleAddRecipe = () => {
    if (name.value.length === 0) {
      setName(prevState => ({
        ...prevState,
        error: i.t('fillField'),
      }));
      return;
    }

    let errorIngredients = false;
    ingredients.forEach((ingredient, index) => {
      if (ingredient.value.length === 0) {
        setIngredientError(i.t('fillField'), index);
        errorIngredients = true;
      }
    });
    if (errorIngredients) {
      return;
    }

    if (algorithm.value.length === 0) {
      setAlgorithm(prevState => ({
        ...prevState,
        error: i.t('fillField'),
      }));
      return;
    }

    setLoading(true);
    addRecipe(
      name.value,
      ingredients.map(ingredient => ingredient.value),
      algorithm.value,
    )
      .then(() => {
        setLoading(false);
        navigation.navigate(RECIPE_LIST_SCREEN);
      })
      .catch(error => {
        setLoading(false);
        ErrorAlert(error.userInfo?.message);
      });
  };

  const addIngredient = () =>
    setIngredients(prevState => [...prevState, { value: '', error: null }]);

  const setIngredientValue = (text, index) =>
    setIngredients(prevState =>
      prevState.map((item, idx) =>
        idx === index
          ? {
              value: text,
              error: text.length ? null : i.t('fillField'),
            }
          : item,
      ),
    );

  const setIngredientError = (error, index) =>
    setIngredients(prevState =>
      prevState.map((item, idx) =>
        idx === index
          ? {
              ...item,
              error,
            }
          : item,
      ),
    );

  const deleteIIngredient = () =>
    setIngredients(prevState => prevState.slice(0, -1));

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <Text style={commonStyles.title}>{i.t('addRecipe')}</Text>
      <Text style={commonStyles.subTitle}>{i.t('enterRecipeDetails')}</Text>
      <TextField
        inputRef={nameInput}
        style={styles.textField}
        onChangeText={text =>
          setName({
            error: text.length ? null : i.t('fillField'),
            value: text,
          })
        }
        value={name.value}
        error={name.error}
        placeholder={i.t('recipeName')}
        returnKeyType="done"
      />
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredient}>
          <TextField
            style={styles.ingredientTextField}
            onChangeText={text => setIngredientValue(text, index)}
            value={ingredient.value}
            error={ingredient.error}
            placeholder={`${i.t('ingredient')} ${index + 1}`}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={index ? deleteIIngredient : addIngredient}>
            <Icon
              name={index ? 'remove' : 'add'}
              size={20}
              color={COLOR.WHITE}
            />
          </TouchableOpacity>
        </View>
      ))}
      <TextField
        style={styles.textField}
        multiline
        numberOfLines={4}
        onChangeText={text =>
          setAlgorithm({
            error: text.length ? null : i.t('fillField'),
            value: text,
          })
        }
        onSubmitEditing={handleAddRecipe}
        value={algorithm.value}
        error={algorithm.error}
        placeholder={i.t('algorithmCook')}
        returnKeyType="go"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
        <Text style={styles.addButtonText}>{i.t('add')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.MEDIUM,
    paddingTop: SPACING.LARGE,
    backgroundColor: COLOR.BACKGROUND,
  },
  textField: {
    marginBottom: SPACING.MEDIUM,
  },
  ingredient: { flexDirection: 'row', marginBottom: SPACING.MEDIUM },
  ingredientTextField: { flex: 1, marginRight: SPACING.SMALL },
  button: {
    padding: SPACING.SMALL,
    borderRadius: 4,
    backgroundColor: COLOR.GREY,
  },
  addButton: {
    height: 52,
    justifyContent: 'center',
    backgroundColor: COLOR.PRIMARY,
    marginVertical: SPACING.LARGE,
  },
  addButtonText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
});
