interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  centered?: boolean;
  fullScreen?: boolean;
  message?: string;
}

/**
 * LoadingSpinner Component
 * Reusable loading spinner with customizable size and color
 * Used across all pages for loading states
 */
export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  centered = false,
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-3',
    xl: 'h-24 w-24 border-4',
  };

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
      {message && (
        <p className="text-sm text-gray-600 font-medium">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  if (centered) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[200px]">
        {spinner}
      </div>
    );
  }

  return spinner;
}

