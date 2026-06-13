// src/lib/constants/roles.ts

// إيميل الإدارة العليا (God Mode)
export const SOVEREIGN_EMAIL = 'monteerlystudio26@gmail.com';
export const SOVEREIGN_TITLE = 'الوضع السيادي (Super Admin)';

// قاموس الأدوار السيادية الـ 43 مقسمة إلى 11 طبقة
export const MCOS_ROLES = {
  foundation: {
    id: 'foundation', label: 'الأساس (الإنتاج الأساسي)', color: 'blue',
    roles: [
      { id: 'video_editor', label: 'مونتير فيديو' },
      { id: 'motion_designer', label: 'مصمم موشن جرافيك' },
      { id: 'sound_engineer', label: 'مهندس صوت' },
      { id: 'colorist', label: 'ملون سينمائي (Colorist)' }
    ]
  },
  freelance_specialists: {
    id: 'freelance_specialists', label: 'التخصصات المستقلة', color: 'indigo',
    roles: [
      { id: 'animator_3d', label: 'رسام تحريك 3D' },
      { id: 'vfx_artist', label: 'مؤثرات بصرية (VFX)' },
      { id: 'subtitler', label: 'مترجم ومفرغ نصوص' },
      { id: 'thumbnail_designer', label: 'مصمم صور مصغرة' }
    ]
  },
  clients: {
    id: 'clients', label: 'العملاء (الطلب)', color: 'emerald',
    roles: [
      { id: 'content_creator', label: 'صانع محتوى' },
      { id: 'film_director', label: 'مخرج أفلام' },
      { id: 'marketing_agency', label: 'وكالة تسويق' },
      { id: 'business_owner', label: 'صاحب شركة' }
    ]
  },
  growth: {
    id: 'growth', label: 'النمو والإنتاج المتقدم', color: 'purple',
    roles: [
      { id: 'creative_director', label: 'مخرج إبداعي' },
      { id: 'youtube_strategist', label: 'خبير إستراتيجيات يوتيوب' },
      { id: 'social_media_manager', label: 'مدير منصات التواصل' }
    ]
  },
  market: {
    id: 'market', label: 'السوق والمبيعات', color: 'amber',
    roles: [
      { id: 'asset_seller', label: 'بائع أصول (Assets)' },
      { id: 'buyer', label: 'مشتري' }
    ]
  },
  marketing: {
    id: 'marketing', label: 'التسويق والنمو', color: 'rose',
    roles: [
      { id: 'marketing_manager', label: 'مدير تسويق' },
      { id: 'seo_specialist', label: 'أخصائي SEO' },
      { id: 'partnerships_manager', label: 'مدير شراكات' },
      { id: 'community_manager', label: 'مدير مجتمع' }
    ]
  },
  finance: {
    id: 'finance', label: 'المالية والأعمال', color: 'emerald',
    roles: [
      { id: 'accountant', label: 'محاسب' },
      { id: 'revenue_manager', label: 'مدير إيرادات' },
      { id: 'sales_manager', label: 'مدير مبيعات' },
      { id: 'subscriptions_manager', label: 'مدير اشتراكات' }
    ]
  },
  legal: {
    id: 'legal', label: 'القانون والحوكمة', color: 'slate',
    roles: [
      { id: 'legal_advisor', label: 'مستشار قانوني' },
      { id: 'ip_manager', label: 'مسؤول حقوق ملكية' },
      { id: 'contracts_manager', label: 'مدير عقود' }
    ]
  },
  ai: {
    id: 'ai', label: 'الذكاء الاصطناعي', color: 'cyan',
    roles: [
      { id: 'ai_trainer', label: 'مدرب AI' },
      { id: 'ai_ux_designer', label: 'مصمم تجربة AI' },
      { id: 'ai_qa', label: 'مراقب جودة AI' }
    ]
  },
  management: {
    id: 'management', label: 'الإدارة العليا', color: 'amber',
    roles: [
      { id: 'product_manager', label: 'مدير منتج' },
      { id: 'operations_manager', label: 'مدير عمليات' },
      { id: 'ux_director', label: 'مدير تجربة المستخدم' }
    ]
  },
  security: {
    id: 'security', label: 'الأمان والرقابة', color: 'red',
    roles: [
      { id: 'security_officer', label: 'مسؤول أمن' },
      { id: 'data_protection_officer', label: 'مسؤول حماية بيانات' },
      { id: 'internal_auditor', label: 'مدقق داخلي' }
    ]
  },
  institutions: {
    id: 'institutions', label: 'المؤسسات والوكالات', color: 'indigo',
    roles: [
      { id: 'agency_owner', label: 'صاحب وكالة' },
      { id: 'project_manager', label: 'مدير مشاريع' },
      { id: 'talent_agent', label: 'وكيل مواهب' },
      { id: 'hr_manager', label: 'مدير موارد بشرية' },
      { id: 'production_company', label: 'شركة إنتاج' },
      { id: 'educational_institution', label: 'مؤسسة تعليمية' }
    ]
  }
};

// قاموس الألوان للطبقات (تم إضافته جراحياً لدعم مكون المؤشر)
export const LAYER_COLORS: Record<string, string> = {
  foundation: 'bg-blue-600',
  freelance_specialists: 'bg-indigo-600',
  clients: 'bg-emerald-600',
  growth: 'bg-purple-600',
  market: 'bg-amber-600',
  marketing: 'bg-rose-600',
  finance: 'bg-emerald-600',
  legal: 'bg-slate-600',
  ai: 'bg-cyan-600',
  management: 'bg-amber-600',
  security: 'bg-red-600',
  institutions: 'bg-indigo-600'
};
