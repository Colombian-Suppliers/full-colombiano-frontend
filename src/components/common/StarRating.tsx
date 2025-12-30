import React from 'react';
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  readonly?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

/**
 * StarRating Component
 * Reusable star rating display/input component
 * Used in Reviews and Product Detail pages
 */
export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  readonly = true,
  onChange,
  className = '',
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.floor(rating);
    const isHalf = !isFilled && starValue <= Math.ceil(rating) && rating % 1 !== 0;

    const handleClick = () => {
      if (!readonly && onChange) {
        onChange(starValue);
      }
    };

    return (
      <span
        key={index}
        onClick={handleClick}
        className={readonly ? '' : 'cursor-pointer hover:scale-110 transition-transform'}
      >
        {isFilled ? (
          <MdStar className={`${sizeClasses[size]} text-yellow-400`} />
        ) : isHalf ? (
          <MdStarHalf className={`${sizeClasses[size]} text-yellow-400`} />
        ) : (
          <MdStarBorder className={`${sizeClasses[size]} text-gray-300`} />
        )}
      </span>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => renderStar(i))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

