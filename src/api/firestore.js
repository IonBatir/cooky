import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const foodCollection = firestore().collection('food');
const barcodeCollection = firestore().collection('barcode');

const getUid = () => auth().currentUser?.uid;

export const getFood = (
  successCallback,
  errorCallback = error => console.error(error),
) =>
  foodCollection
    .where('uid', '==', getUid())
    .orderBy('expiryDate', 'asc')
    .onSnapshot(
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
    uid: getUid(),
    expiryDate: firestore.Timestamp.fromDate(expiryDate),
  });

export const editFood = (id, name, expiryDate) =>
  foodCollection
    .doc(id)
    .set({ name, expiryDate: firestore.Timestamp.fromDate(expiryDate) });

export const deleteFood = id => foodCollection.doc(id).delete();

export const getBarcode = id =>
  barcodeCollection
    .doc(id)
    .get()
    .then(doc =>
      doc.exists
        ? Promise.resolve(doc.data())
        : Promise.reject({ userInfo: { message: 'No such barcode!' } }),
    );
