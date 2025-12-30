import React from 'react';
interface AlertItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  count?: number;
  colorClass: string;
  iconBgClass: string;
  onClick?: () => void;
}

/**
 * AlertItem Component
 * Reusable alert item for notifications and important messages
 * Used in Dashboard
 */
export default function AlertItem({
  icon: Icon,
  text,
  count,
  colorClass,
  iconBgClass,
  onClick,
}: AlertItemProps) {
  return (
    <div
      className={`flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${iconBgClass}`}>
          <Icon className={`text-lg ${colorClass}`} />
        </div>
        <span className="text-sm text-gray-700 font-medium">{text}</span>
      </div>
      {count !== undefined && (
        <span className="bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

