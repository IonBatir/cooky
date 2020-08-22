import { Alert } from 'react-native';

export default function ErrorAlert(
  message = 'Something went wrong! Try again.',
  onOk = () => {},
  onCancel,
) {
  const buttons = [{ text: 'OK', onPress: onOk }];
  if (onCancel) {
    buttons.push({ text: 'Cancel', onPress: onCancel });
  }
  Alert.alert('Error', message, buttons);
}
