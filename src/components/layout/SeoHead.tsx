import React from 'react';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
}

export function SeoHead({ title, description, image }: SeoProps) {
  const siteName = "Monteerly Studio";
  const defaultDesc = "المنصة العربية الأولى لخدمات المونتاج وصناعة المحتوى.";
  const defaultImg = "https://monteerly.com/og-image.jpg";

  return (
    <>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description || defaultDesc} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImg} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImg} />
    </>
  );
}

################################################################################