import React from 'react';
import Button from '@/components/ui/Button/Button';
import { MdWarning, MdInfo, MdError, MdCheckCircle } from 'react-icons/md';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  loading?: boolean;
}

/**
 * ConfirmDialog Component
 * Reusable confirmation dialog with different variants
 * Fully testable modal component
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning',
  loading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variants = {
    danger: {
      icon: <MdError className="w-12 h-12 text-red-600" />,
      iconBg: 'bg-red-100',
      confirmButton: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: <MdWarning className="w-12 h-12 text-yellow-600" />,
      iconBg: 'bg-yellow-100',
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: <MdInfo className="w-12 h-12 text-blue-600" />,
      iconBg: 'bg-blue-100',
      confirmButton: 'bg-blue-600 hover:bg-blue-700',
    },
    success: {
      icon: <MdCheckCircle className="w-12 h-12 text-green-600" />,
      iconBg: 'bg-green-100',
      confirmButton: 'bg-green-600 hover:bg-green-700',
    },
  };

  const config = variants[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={loading ? undefined : onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        {/* Icon */}
        <div className={`${config.iconBg} rounded-full p-3 w-fit mx-auto mb-4`}>
          {config.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-white ${config.confirmButton}`}
          >
            {loading ? 'Procesando...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

