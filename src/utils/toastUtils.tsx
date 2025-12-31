/**
 * Toast Utilities
 * Wrapper functions for react-hot-toast with consistent styling
 */

import toast from 'react-hot-toast';
import { FiCheckCircle, FiXCircle, FiAlertOctagon } from 'react-icons/fi';

interface ToastOptions {
  duration?: number;
  actionText?: string | null;
  actionUrl?: string | null;
}

const TOAST_TYPES = {
  success: {
    background: '#F0FDF4',
    color: '#166534',
    border: '#BBF7D0',
    buttonBg: '#DCFCE7',
    icon: FiCheckCircle,
  },
  error: {
    background: '#FEF2F2',
    color: '#b91c1c',
    border: '#FECACA',
    buttonBg: '#FEE2E2',
    icon: FiXCircle,
  },
  alert: {
    background: '#FFFBEB',
    color: '#92400e',
    border: '#FDE68A',
    buttonBg: '#FEF3C7',
    icon: FiAlertOctagon,
  },
} as const;

const baseStyle = (type: keyof typeof TOAST_TYPES) => ({
  background: TOAST_TYPES[type].background,
  color: TOAST_TYPES[type].color,
  border: `1px solid ${TOAST_TYPES[type].border}`,
  padding: '12px 16px',
  borderRadius: '8px',
});

function showToast(
  type: keyof typeof TOAST_TYPES,
  message: string,
  { actionText = null, actionUrl = null, duration = 4000 }: ToastOptions = {}
) {
  const config = TOAST_TYPES[type];
  if (!config) {
    return showToast('alert', message, { actionText, actionUrl, duration });
  }

  toast.dismiss();

  const IconComponent = config.icon;

  toast(
    (t) => (
      <div style={baseStyle(type)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <IconComponent style={{ width: 20, height: 20, flexShrink: 0 }} />
            <div>{message}</div>
          </div>
          {actionText && actionUrl && (
            <button
              onClick={() => {
                window.open(actionUrl, '_blank');
                toast.dismiss(t.id);
              }}
              style={{
                background: config.buttonBg,
                color: config.color,
                border: `1px solid ${config.border}`,
                padding: '6px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    ),
    { duration }
  );
}

export function showSuccessToast(
  message: string,
  { actionText = null, actionUrl = null, duration = 4000 }: ToastOptions = {}
) {
  return showToast('success', message, { actionText, actionUrl, duration });
}

export function showErrorToast(
  message: string,
  { actionText = null, actionUrl = null }: ToastOptions = {}
) {
  return showToast('error', message, { actionText, actionUrl, duration: 5000 });
}

export function showAlertToast(
  message: string,
  { actionText = null, actionUrl = null, duration = 4000 }: ToastOptions = {}
) {
  return showToast('alert', message, { actionText, actionUrl, duration });
}

export default { showSuccessToast, showErrorToast, showAlertToast };
