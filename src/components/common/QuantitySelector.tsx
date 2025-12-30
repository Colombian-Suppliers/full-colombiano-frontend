import { MdAdd, MdRemove } from 'react-icons/md';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * QuantitySelector Component
 * Reusable quantity selector with +/- buttons
 * Used in Cart and Product Detail pages
 */
export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 999,
  disabled = false,
  size = 'md',
  className = '',
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  const textSizeClasses = {
    sm: 'w-8 text-sm',
    md: 'w-12 text-base',
    lg: 'w-16 text-lg',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 bg-gray-50 rounded-lg p-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={`${sizeClasses[size]} hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <MdRemove className={iconSizeClasses[size]} />
      </button>
      <span
        className={`${textSizeClasses[size]} text-center font-medium select-none`}
      >
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={`${sizeClasses[size]} hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <MdAdd className={iconSizeClasses[size]} />
      </button>
    </div>
  );
}

