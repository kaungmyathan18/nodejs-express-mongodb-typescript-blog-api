import { I18n } from 'i18n';
import path from 'path';

const i18n = new I18n({
  locales: ['en', 'mm'],
  defaultLocale: 'en',
  directory: path.join('./', 'locales'),
});
export default i18n;
