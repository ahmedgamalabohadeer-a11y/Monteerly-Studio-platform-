interface LanguageContextValue {
  lang: string;
  t: (key: string) => string;
  switchLanguage: (lang: string) => void;
}

export const useLang = (): LanguageContextValue => ({
  lang: 'ar',
  t: (key) => key,
  switchLanguage: () => {},
});
