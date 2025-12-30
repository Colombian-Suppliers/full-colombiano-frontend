interface StatusBadgeProps {
  status: string;
  statusConfig?: Record<string, { bg: string; text: string; label: string }>;
  className?: string;
}

/**
 * StatusBadge Component
 * Reusable status badge with configurable colors
 * Used across Orders, Returns, Payments, etc.
 */
export default function StatusBadge({
  status,
  statusConfig,
  className = '',
}: StatusBadgeProps) {
  const defaultConfig: Record<string, { bg: string; text: string; label: string }> = {
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Aprobado',
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pendiente',
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Rechazado',
    },
    completed: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      label: 'Completado',
    },
    shipped: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Enviado',
    },
  };

  const config = statusConfig || defaultConfig;
  const currentConfig = config[status] || config.pending;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${currentConfig.bg} ${currentConfig.text} ${className}`}
    >
      {currentConfig.label}
    </span>
  );
}

