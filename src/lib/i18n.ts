export type Language = 'ar' | 'en';
export const useI18n = () => ({
  language: 'ar' as Language,
  switchLanguage: (lang: Language) => {},
  t: (key: string) => key
});