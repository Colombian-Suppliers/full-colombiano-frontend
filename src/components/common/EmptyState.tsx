import Button from '@/components/ui/Button/Button';

interface EmptyStateProps {
  icon?: string | React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * EmptyState Component
 * Reusable empty state component with icon, title, description, and optional action
 * Used across multiple pages (Cart, Products, Reviews, etc.)
 */
export default function EmptyState({
  icon = '📦',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center ${className}`}
    >
      <div className="text-6xl mb-4">
        {typeof icon === 'string' ? icon : icon}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

