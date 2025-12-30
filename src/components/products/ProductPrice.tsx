interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

/**
 * ProductPrice Component
 * Displays product price with optional discount/original price
 * Fully testable price display component
 */
export default function ProductPrice({
  price,
  originalPrice,
  currency = 'COP',
  size = 'md',
  showDiscount = true,
  className = '',
}: ProductPriceProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Current Price */}
      <span className={`font-bold text-gray-900 ${sizeClasses[size]}`}>
        {formatPrice(price)}
      </span>

      {/* Original Price (if discount) */}
      {hasDiscount && (
        <>
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(originalPrice)}
          </span>
          {showDiscount && (
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
        </>
      )}
    </div>
  );
}

