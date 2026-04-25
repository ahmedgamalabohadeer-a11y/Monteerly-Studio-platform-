'use client';
import { useState, useEffect } from 'react';

export interface GeoData {
  country: string;
  currency: string;
  flag: string;
  welcomeMsg: string;
}

export function useGeoLocation() {
  const [geo, setGeo] = useState<GeoData>({
    country: 'Global',
    currency: 'USD',
    flag: '🌍',
    welcomeMsg: 'Welcome'
  });

  useEffect(() => {
    // محاكاة ذكية للكشف عن الموقع (يمكن ربطها بـ Cloudflare/Vercel Headers لاحقاً)
    // هنا نفترض أننا اكتشفنا زائر من السعودية كمثال للسيناريو
    const mockDetection = {
      country: 'المملكة العربية السعودية',
      currency: 'SAR',
      flag: '🇸🇦',
      welcomeMsg: 'مرحباً بك'
    };
    
    // تأخير بسيط لمحاكاة التحميل الواقعي
    setTimeout(() => setGeo(mockDetection), 500);
  }, []);

  return geo;
}

################################################################################