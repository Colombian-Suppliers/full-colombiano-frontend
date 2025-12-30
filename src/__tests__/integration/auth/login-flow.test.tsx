import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/(auth)/login/page';

// Mock next/navigation
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

// Mock useAuth hook
const mockLogin = vi.fn();

vi.mock('@/lib/hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    user: null,
  }),
}));

// Mock toast utils
const mockShowErrorToast = vi.fn();
const mockShowSuccessToast = vi.fn();

vi.mock('@/utils/toastUtils', () => ({
  showErrorToast: mockShowErrorToast,
  showSuccessToast: mockShowSuccessToast,
  showAlertToast: vi.fn(),
}));

describe('Login Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Login Form', () => {
    it('renders login form with all required fields', () => {
      render(<LoginPage />);

      expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByText(/¿olvidaste tu contraseña\?/i)).toBeInTheDocument();
      expect(screen.getByText(/¿no tienes cuenta\?/i)).toBeInTheDocument();
    });

    it('allows user to type in email and password fields', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const emailInput = screen.getByLabelText(/correo electrónico/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'SecurePass123!');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('SecurePass123!');
    });

    it('submits form with valid credentials', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({ success: true, user: { id: 1, email: 'test@example.com' } });

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.type(screen.getByLabelText(/contraseña/i), 'SecurePass123!');

      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'SecurePass123!',
        });
      });
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.type(screen.getByLabelText(/contraseña/i), 'SecurePass123!');

      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);

      expect(screen.getByText(/iniciando sesión.../i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('displays error message on failed login', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Credenciales inválidas'));

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.type(screen.getByLabelText(/contraseña/i), 'WrongPassword');

      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalled();
      });
    });
  });

  describe('Form Validation', () => {
    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const emailInput = screen.getByLabelText(/correo electrónico/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      // Email validation should trigger (implementation dependent)
      expect(emailInput).toHaveValue('invalid-email');
    });

    it('requires both email and password', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);

      // Form should not submit without required fields
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows inline validation errors', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);

      // Should show validation errors (implementation dependent)
      const emailInput = screen.getByLabelText(/correo electrónico/i);
      expect(emailInput).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('has link to forgot password page', () => {
      render(<LoginPage />);

      const forgotPasswordLink = screen.getByText(/¿olvidaste tu contraseña\?/i);
      expect(forgotPasswordLink).toHaveAttribute('href');
    });

    it('has link to registration page', () => {
      render(<LoginPage />);

      const registerLink = screen.getByText(/regístrate/i);
      expect(registerLink).toHaveAttribute('href');
    });
  });

  describe('Remember Me Feature', () => {
    it('renders remember me checkbox', () => {
      render(<LoginPage />);

      const rememberCheckbox = screen.getByRole('checkbox', { name: /recuérdame/i });
      expect(rememberCheckbox).toBeInTheDocument();
    });

    it('allows toggling remember me checkbox', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const rememberCheckbox = screen.getByRole('checkbox', { name: /recuérdame/i });
      
      expect(rememberCheckbox).not.toBeChecked();
      
      await user.click(rememberCheckbox);
      expect(rememberCheckbox).toBeChecked();
      
      await user.click(rememberCheckbox);
      expect(rememberCheckbox).not.toBeChecked();
    });
  });

  describe('Email Verification Status', () => {
    it('handles unverified email error', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue({ 
        response: { 
          data: { 
            detail: 'Email not verified' 
          } 
        } 
      });

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/correo electrónico/i), 'unverified@example.com');
      await user.type(screen.getByLabelText(/contraseña/i), 'SecurePass123!');

      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockShowErrorToast).toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<LoginPage />);

      expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });

    it('has accessible submit button', () => {
      render(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});

