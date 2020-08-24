const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function replaceRomanianChars(str) {
  const regex = /(ă|î|ș|ț|â)/g;
  const charMap = {
    ă: 'a',
    î: 'i',
    ș: 'ș',
    ț: 't',
    â: 'a',
  };
  if (regex.test(str)) {
    str = str.replace(regex, (m, key) => charMap[key]);
  }
  return str;
}

function cleanString(str) {
  return replaceRomanianChars(str.toLowerCase());
}

function getFood(uid) {
  return admin
    .firestore()
    .collection('food')
    .where('uid', '==', uid)
    .get()
    .then(querySnapshot => {
      const food = [];
      querySnapshot.forEach(doc => {
        food.push({ id: doc.id, ...doc.data() });
      });
      return Promise.resolve(food);
    });
}

function getRecipes() {
  return admin
    .firestore()
    .collection('recipes')
    .get()
    .then(querySnapshot => {
      const recipes = [];
      querySnapshot.forEach(doc => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      return Promise.resolve(recipes);
    });
}

function generateCookingRecipes(uid) {
  return Promise.all([getFood(uid), getRecipes()]).then(([food, recipes]) => {
    const validRecipes = [];
    recipes.forEach(recipe => {
      const cleanFood = cleanString(food.join(''));
      if (
        recipe.ingredients.every(ingredient =>
          cleanFood.contains(cleanString(ingredient)),
        )
      )
        validRecipes.push({ recipeId: recipe.id, name: recipe.name });
    });
    return Promise.resolve(validRecipes);
  });
}

function setRecipes(uid, recipes) {
  return admin
    .firestore()
    .collection('cook')
    .doc(uid)
    .set({ uid, recipes });
}

exports.handleCreateFood = functions.firestore
  .document('/food/{documentId}')
  .onCreate(async snap => {
    const uid = snap.data().uid;
    const recipes = await generateCookingRecipes(uid);
    return setRecipes(uid, recipes);
  });

exports.handleDeleteFood = functions.firestore
  .document('/food/{documentId}')
  .onDelete(async snap => {
    const uid = snap.data().uid;
    const recipes = await generateCookingRecipes(uid);
    return setRecipes(uid, recipes);
  });

exports.handleCreateRecipe = functions.firestore
  .document('/food/{documentId}')
  .onCreate(async snap => {
    const uid = snap.data().uid;
    const recipes = await generateCookingRecipes(uid);
    return setRecipes(uid, recipes);
  });
