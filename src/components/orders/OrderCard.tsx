import { StatusBadge } from '@/components/common';
import { MdLocationOn, MdPerson } from 'react-icons/md';

export interface OrderCardData {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerAddress: string;
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  createdAt: string;
}

interface OrderCardProps {
  order: OrderCardData;
  onAction?: (orderId: string) => void;
  actionLabel?: string;
  className?: string;
}

/**
 * OrderCard Component
 * Displays order summary information in a card format
 * Fully testable, reusable order display component
 */
export default function OrderCard({
  order,
  onAction,
  actionLabel,
  className = '',
}: OrderCardProps) {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmado' },
    shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Enviado' },
    delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Entregado' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' },
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">
            Pedido #{order.orderNumber}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <StatusBadge status={order.status} statusConfig={statusConfig} />
      </div>

      {/* Buyer Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MdPerson className="w-4 h-4 text-gray-400" />
          <span>{order.buyerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MdLocationOn className="w-4 h-4 text-gray-400" />
          <span>{order.buyerAddress}</span>
        </div>
      </div>

      {/* Items Summary */}
      <div className="border-t border-gray-200 pt-3 mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
        </p>
        <div className="space-y-1">
          {order.items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="text-sm text-gray-600 flex justify-between"
            >
              <span>
                {item.quantity}x {item.productName}
              </span>
              <span className="font-medium">
                ${item.price.toLocaleString('es-CO')}
              </span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-xs text-gray-500">
              +{order.items.length - 3} más...
            </p>
          )}
        </div>
      </div>

      {/* Total and Action */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold text-gray-900">
            ${order.total.toLocaleString('es-CO')}
          </p>
        </div>
        {onAction && actionLabel && (
          <button
            onClick={() => onAction(order.id)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

