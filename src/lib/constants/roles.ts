export type UserRole = {
  id: string;
  label: string;
  description: string;
  layer: 'Core' | 'Growth' | 'Enterprise' | 'Tech' | 'Intelligence' | 'Passive';
};

export const USER_ROLES: UserRole[] = [
  // 1. Core Layer (الأساس)
  { id: 'creator_novice', label: 'المبدع المبتدئ', description: 'واجهة تعليمية، AI Studio، مهام بسيطة.', layer: 'Core' },
  { id: 'client_solo', label: 'العميل السريع (Express)', description: 'مسار سريع لطلب ودفع واستلام فيديو واحد.', layer: 'Core' },
  { id: 'guest', label: 'الضيف المراجع', description: 'مشاهدة واعتماد فقط. لا تسجيل دخول.', layer: 'Core' },

  // 2. Growth Layer (النمو)
  { id: 'freelancer_pro', label: 'المستقل المحترف', description: 'لوحة تحكم كاملة، تحليلات، محفظة.', layer: 'Growth' },
  { id: 'asset_seller', label: 'بائع الأصول', description: 'لوحة بائع للمتجر، إحصائيات مبيعات.', layer: 'Growth' },
  { id: 'project_manager', label: 'مدير المشروع', description: 'جداول زمنية، توزيع مهام، مركز إشعارات.', layer: 'Growth' },
  { id: 'talent_agent', label: 'وكيل المواهب', description: 'إدارة بروفايلات متعددة، تفاوض مالي.', layer: 'Growth' },

  // 3. Enterprise Layer (المؤسسات)
  { id: 'agency_owner', label: 'مدير الوكالة', description: 'إدارة فريق، رواتب، White-label.', layer: 'Enterprise' },
  { id: 'client_enterprise', label: 'العميل المؤسسي', description: 'نطاق خاص، تقارير مخصصة، أمان عالي.', layer: 'Enterprise' },
  { id: 'compliance_officer', label: 'مسؤول الامتثال', description: 'أرشيف قانوني، عقود، حقوق ملكية.', layer: 'Enterprise' },
  { id: 'security_officer', label: 'مدير الأمان', description: 'سجلات تدقيق (Logs)، مراقبة تهديدات.', layer: 'Enterprise' },
  { id: 'accountant', label: 'المحاسب', description: 'فواتير وضراءب فقط. محجوب عن المحتوى.', layer: 'Enterprise' },

  // 4. Tech & Ops Layer (البنية التحتية)
  { id: 'broadcast_eng', label: 'مهندس البث', description: 'لوحة تحكم البث المباشر (Bitrate/Latency).', layer: 'Tech' },
  { id: 'qc_specialist', label: 'مدقق الجودة', description: 'أدوات فحص فني (Scopes) دقيقة.', layer: 'Tech' },
  { id: 'vendor_api', label: 'مزود خدمة (API)', description: 'لوحة مطورين، Webhooks، مفاتيح API.', layer: 'Tech' },
  { id: 'developer', label: 'المطور الداخلي', description: 'تكامل الأنظمة الداخلية.', layer: 'Tech' },

  // 5. Intelligence Layer (الذكاء والبيانات)
  { id: 'creative_analyst', label: 'محلل البيانات', description: 'خرائط حرارية، تقارير أداء المحتوى.', layer: 'Intelligence' },
  { id: 'sponsor', label: 'الراعي / المعلن', description: 'محرك بحث لاكتشاف فرص الرعاية.', layer: 'Intelligence' },
  { id: 'bulk_buyer', label: 'المشتري بالجملة', description: 'بوابة مشتريات الشركات، فواتير مجمعة.', layer: 'Intelligence' },

  // 6. Passive Layer (المراقبون)
  { id: 'silent_partner', label: 'المالك الصامت', description: 'لوحة مؤشرات مالية (ROI) فقط.', layer: 'Passive' },
  { id: 'instructor', label: 'المدرب المعتمد', description: 'لوحة المدرب في الأكاديمية.', layer: 'Passive' },
  { id: 'moderator', label: 'مشرف المجتمع', description: 'أدوات إدارة المنتدى والسوق.', layer: 'Passive' },
];

export const LAYER_COLORS = {
  Core: 'bg-blue-500',
  Growth: 'bg-green-500',
  Enterprise: 'bg-purple-600',
  Tech: 'bg-orange-500',
  Intelligence: 'bg-pink-500',
  Passive: 'bg-slate-500',
};

################################################################################