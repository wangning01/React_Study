import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // Optional: To load translations from a server
import LanguageDetector from 'i18next-browser-languagedetector'; // Optional: For language detection

i18n
  .use(Backend) // Load translations from a backend server
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'en', // Fallback language
    debug: true,       // Set to `false` in production

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Translation file path
    },
  });

export default i18n;
