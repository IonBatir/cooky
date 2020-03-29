import auth from '@react-native-firebase/auth';

export const onAuthStateChanged = handleAuthStateChanged =>
  auth().onAuthStateChanged(handleAuthStateChanged);
