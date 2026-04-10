import { SITE_CONTENT } from '@/lib/content';
import { useI18n } from '@/lib/i18n';

export function useContent() {
  const { language } = useI18n();
  const langKey = (language === 'ar' || language === 'en') ? language : 'ar';
  return SITE_CONTENT[langKey];
}
