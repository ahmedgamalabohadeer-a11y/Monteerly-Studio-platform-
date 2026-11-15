export type Language = 'ar' | 'en';

interface I18nControls {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useI18n = (): I18nControls => ({
  language: 'ar',
  switchLanguage: () => {},
  t: (key) => key,
});
