import React from 'react';
import { MdInfoOutline } from 'react-icons/md';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  infoIcon?: boolean;
  className?: string;
}

/**
 * StatCard Component
 * Reusable stat card for displaying metrics
 * Used in Dashboard and other pages
 */
export default function StatCard({
  title,
  value,
  subtitle,
  infoIcon = true,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center relative shadow-sm ${className}`}
    >
      {infoIcon && (
        <MdInfoOutline className="absolute top-2 right-2 text-gray-400 text-xs" />
      )}
      <h3 className="text-xs font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

