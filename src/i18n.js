import I18n from 'react-native-i18n';
import en from './locales/en-GB.json';
import ro from './locales/ro-RO.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ro,
};

export default I18n;
