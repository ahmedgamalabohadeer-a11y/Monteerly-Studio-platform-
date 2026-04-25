'use client';
import React, { useState, useEffect } from 'react';

interface ResponsiveWrapperProps {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
  tablet?: React.ReactNode;
}

export function ResponsiveWrapper({ desktop, mobile, tablet }: ResponsiveWrapperProps) {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width < 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (device === 'mobile') return <>{mobile}</>;
  if (device === 'tablet') return <>{tablet || desktop}</>; // Fallback to desktop if tablet not provided
  return <>{desktop}</>;
}

################################################################################