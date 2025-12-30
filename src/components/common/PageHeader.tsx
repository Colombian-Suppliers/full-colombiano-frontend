import React from 'react';
interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * PageHeader Component
 * Reusable page header with title, description, badge, and action buttons
 * Used across all dashboard pages
 */
export default function PageHeader({
  title,
  description,
  badge,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {badge}
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}

