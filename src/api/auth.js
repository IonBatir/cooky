import auth from '@react-native-firebase/auth';

export const onAuthStateChanged = handleAuthStateChanged =>
  auth().onAuthStateChanged(handleAuthStateChanged);

export const login = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

export const register = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

export const resetPassword = email => auth().sendPasswordResetEmail(email);
