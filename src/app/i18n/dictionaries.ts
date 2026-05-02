import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ar') => {
  // التراجع للغة العربية الافتراضية في حال وجود لغة غير مدعومة
  return dictionaries[locale]?.() ?? dictionaries.ar()
}
