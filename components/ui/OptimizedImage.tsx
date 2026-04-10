import Image from 'next/image';

interface OptimizedImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({ src, alt, className = '', ...props }: OptimizedImageProps) => {
  // التحقق مما إذا كان الرابط خارجياً (للأمان)
  const isExternal = src.startsWith('http');

  return (
    <Image
      src={src}
      alt={alt || 'image'}
      width={0}
      height={0}
      sizes="100vw"
      className={`transition-opacity duration-300 w-full h-auto ${className}`}
      {...props}
      unoptimized={!isExternal && src.endsWith('.svg')} // عدم تحسين الـ SVG لتجنب المشاكل
    />
  );
};
