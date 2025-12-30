import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPasswordPage from '@/app/(auth)/forgot-password/page';
import ResetPasswordPage from '@/app/(auth)/reset-password/page';

// Mock next/navigation
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn((param) => {
      if (param === 'token') return 'valid-token-123';
      return null;
    }),
  }),
}));

// Mock toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
  },
}));

describe('Password Reset Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Forgot Password Page', () => {
    it('renders forgot password form', () => {
      render(<ForgotPasswordPage />);

      expect(screen.getByText(/¿olvidaste tu contraseña\?/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enviar enlace/i })).toBeInTheDocument();
    });

    it('allows user to enter email address', async () => {
      const user = userEvent.setup();
      render(<ForgotPasswordPage />);

      const emailInput = screen.getByLabelText(/correo electrónico/i);
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('validates email format before submission', async () => {
      const user = userEvent.setup();
      render(<ForgotPasswordPage />);

      const emailInput = screen.getByLabelText(/correo electrónico/i);
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /enviar enlace/i });
      await user.click(submitButton);

      // Should show validation error
      expect(emailInput).toHaveValue('invalid-email');
    });

    it('shows success message after sending reset email', async () => {
      const user = userEvent.setup();
      
      // Mock successful API call
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Email sent' }),
      });

      render(<ForgotPasswordPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.click(screen.getByRole('button', { name: /enviar enlace/i }));

      await waitFor(() => {
        expect(screen.getByText(/correo enviado/i)).toBeInTheDocument();
      });
    });

    it('implements cooldown period after sending email', async () => {
      const user = userEvent.setup();
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Email sent' }),
      });

      render(<ForgotPasswordPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.click(screen.getByRole('button', { name: /enviar enlace/i }));

      await waitFor(() => {
        expect(screen.getByText(/correo enviado/i)).toBeInTheDocument();
      });

      // Try to resend immediately
      const resendButton = screen.getByText(/reenviar correo/i);
      expect(resendButton).toBeDisabled();
    });

    it('shows countdown timer during cooldown', async () => {
      const user = userEvent.setup();
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Email sent' }),
      });

      render(<ForgotPasswordPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.click(screen.getByRole('button', { name: /enviar enlace/i }));

      await waitFor(() => {
        expect(screen.getByText(/correo enviado/i)).toBeInTheDocument();
      });

      // Should show countdown
      expect(screen.getByText(/segundos/i)).toBeInTheDocument();
    });

    it('has link back to login page', () => {
      render(<ForgotPasswordPage />);

      const loginLink = screen.getByText(/volver al inicio de sesión/i);
      expect(loginLink).toHaveAttribute('href');
    });
  });

  describe('Reset Password Page', () => {
    it('renders reset password form with token', () => {
      render(<ResetPasswordPage />);

      expect(screen.getByText(/restablecer contraseña/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/nueva contraseña/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /restablecer contraseña/i })).toBeInTheDocument();
    });

    it('allows user to enter new password', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />);

      const passwordInput = screen.getByLabelText(/nueva contraseña/i);
      await user.type(passwordInput, 'NewSecurePass123!');

      expect(passwordInput).toHaveValue('NewSecurePass123!');
    });

    it('validates password strength', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />);

      const passwordInput = screen.getByLabelText(/nueva contraseña/i);
      await user.type(passwordInput, 'weak');

      // Should show password requirements
      expect(screen.getByText(/mínimo 10 caracteres/i)).toBeInTheDocument();
    });

    it('validates password confirmation match', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />);

      await user.type(screen.getByLabelText(/nueva contraseña/i), 'SecurePass123!');
      await user.type(screen.getByLabelText(/confirmar contraseña/i), 'DifferentPass123!');

      const submitButton = screen.getByRole('button', { name: /restablecer contraseña/i });
      await user.click(submitButton);

      // Should show validation error for mismatched passwords
      const confirmInput = screen.getByLabelText(/confirmar contraseña/i);
      expect(confirmInput).toHaveValue('DifferentPass123!');
    });

    it('submits form with valid password', async () => {
      const user = userEvent.setup();
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Password reset successful' }),
      });

      render(<ResetPasswordPage />);

      await user.type(screen.getByLabelText(/nueva contraseña/i), 'NewSecurePass123!');
      await user.type(screen.getByLabelText(/confirmar contraseña/i), 'NewSecurePass123!');

      const submitButton = screen.getByRole('button', { name: /restablecer contraseña/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      
      global.fetch = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 1000))
      );

      render(<ResetPasswordPage />);

      await user.type(screen.getByLabelText(/nueva contraseña/i), 'NewSecurePass123!');
      await user.type(screen.getByLabelText(/confirmar contraseña/i), 'NewSecurePass123!');

      const submitButton = screen.getByRole('button', { name: /restablecer contraseña/i });
      await user.click(submitButton);

      expect(screen.getByText(/restableciendo.../i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('shows error for invalid or expired token', () => {
      // Mock useSearchParams to return no token
      vi.mock('next/navigation', () => ({
        useRouter: () => ({
          push: mockPush,
          replace: vi.fn(),
          prefetch: vi.fn(),
        }),
        useSearchParams: () => ({
          get: vi.fn(() => null),
        }),
      }));

      render(<ResetPasswordPage />);

      expect(screen.getByText(/enlace inválido/i)).toBeInTheDocument();
    });

    it('has password visibility toggle', async () => {
      const user = userEvent.setup();
      render(<ResetPasswordPage />);

      const passwordInput = screen.getByLabelText(/nueva contraseña/i);
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Find and click the visibility toggle button
      const toggleButtons = screen.getAllByRole('button', { name: /mostrar|ocultar/i });
      await user.click(toggleButtons[0]);

      // Password should now be visible
      expect(passwordInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Complete Password Reset Flow', () => {
    it('completes full password reset journey', async () => {
      const user = userEvent.setup();
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success' }),
      });

      // Step 1: Request password reset
      const { unmount } = render(<ForgotPasswordPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.click(screen.getByRole('button', { name: /enviar enlace/i }));

      await waitFor(() => {
        expect(screen.getByText(/correo enviado/i)).toBeInTheDocument();
      });

      unmount();

      // Step 2: Reset password with token
      render(<ResetPasswordPage />);

      await user.type(screen.getByLabelText(/nueva contraseña/i), 'NewSecurePass123!');
      await user.type(screen.getByLabelText(/confirmar contraseña/i), 'NewSecurePass123!');

      const submitButton = screen.getByRole('button', { name: /restablecer contraseña/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });
  });
});

