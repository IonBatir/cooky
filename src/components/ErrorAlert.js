import { Alert } from 'react-native';
import i from '../i18n';

export default function ErrorAlert(
  message = i.t('errorMessage'),
  onOk = () => {},
  onCancel,
) {
  const buttons = [{ text: 'OK', onPress: onOk }];
  if (onCancel) {
    buttons.push({ text: i.t('cancel'), onPress: onCancel });
  }
  Alert.alert(i.t('error'), message, buttons);
}
