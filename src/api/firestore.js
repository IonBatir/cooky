import firestore from '@react-native-firebase/firestore';

const foodCollection = firestore().collection('food');

export const getFood = (successCallback, errorCallback) =>
  foodCollection.orderBy('expiryDate', 'asc').onSnapshot(
    querySnapshot => {
      const food = [];
      querySnapshot.forEach(doc => {
        const { name, expiryDate } = doc.data();
        food.push({ id: doc.id, name, expiryDate: expiryDate.toDate() });
      });
      successCallback(food);
    },
    error => errorCallback(error),
  );

export const addFood = (name, expiryDate) =>
  foodCollection.add({
    name,
    expiryDate: firestore.Timestamp.fromDate(expiryDate),
  });

export const editFood = (id, name, expiryDate) =>
  foodCollection
    .doc(id)
    .set({ name, expiryDate: firestore.Timestamp.fromDate(expiryDate) });

export const deleteFood = id => foodCollection.doc(id).delete();
