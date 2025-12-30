import React from 'react';
import { MdCheckCircle, MdWarning, MdCancel } from 'react-icons/md';

interface ProductStockIndicatorProps {
  stock: number;
  lowStockThreshold?: number;
  showQuantity?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * ProductStockIndicator Component
 * Visual indicator for product stock levels
 * Fully testable stock display component
 */
export default function ProductStockIndicator({
  stock,
  lowStockThreshold = 5,
  showQuantity = true,
  size = 'md',
  className = '',
}: ProductStockIndicatorProps) {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const getStockStatus = () => {
    if (stock === 0) {
      return {
        icon: <MdCancel className={`${iconSizes[size]} text-red-600`} />,
        text: 'Agotado',
        color: 'text-red-600',
        bg: 'bg-red-50',
      };
    }

    if (stock <= lowStockThreshold) {
      return {
        icon: <MdWarning className={`${iconSizes[size]} text-yellow-600`} />,
        text: showQuantity ? `Solo ${stock} disponibles` : 'Stock bajo',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
      };
    }

    return {
      icon: <MdCheckCircle className={`${iconSizes[size]} text-green-600`} />,
      text: showQuantity ? `${stock} disponibles` : 'En stock',
      color: 'text-green-600',
      bg: 'bg-green-50',
    };
  };

  const status = getStockStatus();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} ${className}`}
    >
      {status.icon}
      <span className={`${textSizes[size]} font-medium ${status.color}`}>
        {status.text}
      </span>
    </div>
  );
}

