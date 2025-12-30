import { useState } from 'react';
import { MdBrokenImage } from 'react-icons/md';

interface ProductImageProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * ProductImage Component
 * Handles product images with loading states and fallbacks
 * Fully testable image component with error handling
 */
export default function ProductImage({
  src,
  alt,
  size = 'md',
  rounded = true,
  className = '',
  fallbackIcon,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sizeClasses = {
    xs: 'w-12 h-12',
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const roundedClass = rounded ? 'rounded-lg' : '';

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClasses[size]} ${roundedClass} bg-gray-100 flex items-center justify-center ${className}`}
      >
        {fallbackIcon || (
          <MdBrokenImage className="w-1/2 h-1/2 text-gray-400" />
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${roundedClass} relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

