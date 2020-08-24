const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
      if (food.every(fd => recipe.ingredients.includes(fd)))
        validRecipes.push({ recipeId: recipe.id, name: recipe.name });
    });
    return Promise.resolve(validRecipes);
  });
}

exports.handleCreateFood = functions.firestore
  .document('/food/{documentId}')
  .onCreate(async snap => {
    const uid = snap.data().uid;
    const recipes = await generateCookingRecipes(uid);
    return admin
      .firestore()
      .collection('cook')
      .doc(uid)
      .set({ uid, recipes });
  });

exports.handleDeleteFood = functions.firestore
  .document('/food/{documentId}')
  .onDelete(async snap => {
    const uid = snap.data().uid;
    const recipes = await generateCookingRecipes(uid);
    return admin
      .firestore()
      .collection('cook')
      .doc(uid)
      .set({ uid, recipes });
  });

exports.handleCreateRecipe = functions.firestore
  .document('/food/{documentId}')
  .onCreate(async snap => {
    const uid = snap.data().uid;
    const recipes = await generateCookingRecipes(uid);
    return admin
      .firestore()
      .collection('cook')
      .doc(uid)
      .set({ uid, recipes });
  });
