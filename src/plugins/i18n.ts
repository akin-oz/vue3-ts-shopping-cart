import { createI18n } from 'vue-i18n';
import en from '../locale/en.json';
import it from '../locale/it.json';

export default createI18n({
  legacy: false,
  locale: 'it',
  fallbackLocale: 'en',
  messages: {
    en,
    it,
  }
})