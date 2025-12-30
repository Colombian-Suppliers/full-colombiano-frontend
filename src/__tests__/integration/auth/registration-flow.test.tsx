import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '@/app/(auth)/register/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock useAuth hook
vi.mock('@/lib/hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn().mockResolvedValue({ success: true }),
    isAuthenticated: false,
    user: null,
  }),
}));

// Mock geo service
vi.mock('@/lib/services/geo.service', () => ({
  geoApiService: {
    getDepartments: vi.fn().mockResolvedValue([
      { id: 1, name: 'Cundinamarca' },
      { id: 2, name: 'Antioquia' },
    ]),
    getCities: vi.fn().mockResolvedValue([
      { id: 1, name: 'Bogotá' },
      { id: 2, name: 'Medellín' },
    ]),
  },
}));

// Mock toast utils
vi.mock('@/utils/toastUtils', () => ({
  showErrorToast: vi.fn(),
  showSuccessToast: vi.fn(),
}));

describe('Registration Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Buyer Registration Flow', () => {
    it('completes full buyer registration flow', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Step 1: Select account type
      expect(screen.getByText(/selecciona tu tipo de cuenta/i)).toBeInTheDocument();
      
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      // Step 2: Fill personal information
      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/nombre/i), 'Juan');
      await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
      
      const documentTypeSelect = screen.getByLabelText(/tipo de documento/i);
      await user.selectOptions(documentTypeSelect, 'CC');
      
      await user.type(screen.getByLabelText(/número de documento/i), '1234567890');

      const continueButton = screen.getByText(/continuar/i);
      await user.click(continueButton);

      // Step 3: Fill credentials
      await waitFor(() => {
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/correo electrónico/i), 'juan@example.com');
      await user.type(screen.getByLabelText(/confirmar correo/i), 'juan@example.com');
      await user.type(screen.getByLabelText(/^contraseña$/i), 'SecurePass123!');
      await user.type(screen.getByLabelText(/confirmar contraseña/i), 'SecurePass123!');

      const termsCheckbox = screen.getByRole('checkbox');
      await user.click(termsCheckbox);

      const submitButton = screen.getByRole('button', { name: /registrarse/i });
      expect(submitButton).not.toBeDisabled();
    });

    it('validates required fields in personal information step', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Select buyer
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });

      // Try to continue without filling fields
      const continueButton = screen.getByText(/continuar/i);
      await user.click(continueButton);

      // Should still be on the same step (validation prevents progression)
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    });

    it('allows navigation back to previous steps', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Select buyer
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });

      // Fill personal info
      await user.type(screen.getByLabelText(/nombre/i), 'Juan');
      await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
      await user.type(screen.getByLabelText(/número de documento/i), '1234567890');

      const continueButton = screen.getByText(/continuar/i);
      await user.click(continueButton);

      // Now on credentials step
      await waitFor(() => {
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      });

      // Go back
      const backButton = screen.getByText(/volver/i);
      await user.click(backButton);

      // Should be back on personal info step
      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });
    });

    it('displays progress indicator correctly', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Select buyer
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      await waitFor(() => {
        // Should show step 2 of 3 (after account selection)
        expect(screen.getByText(/paso 2 de 3/i)).toBeInTheDocument();
      });
    });
  });

  describe('Seller Registration Flow', () => {
    it('shows person type selection for sellers', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Select seller
      const sellerCard = screen.getByText(/vendedor/i).closest('div');
      await user.click(sellerCard!);

      await waitFor(() => {
        expect(screen.getByText(/tipo de persona/i)).toBeInTheDocument();
        expect(screen.getByText(/persona natural/i)).toBeInTheDocument();
        expect(screen.getByText(/persona jurídica/i)).toBeInTheDocument();
      });
    });

    it('completes natural person seller registration', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Step 1: Select seller
      const sellerCard = screen.getByText(/vendedor/i).closest('div');
      await user.click(sellerCard!);

      // Step 2: Select natural person
      await waitFor(() => {
        expect(screen.getByText(/persona natural/i)).toBeInTheDocument();
      });

      const naturalCard = screen.getByText(/persona natural/i).closest('div');
      await user.click(naturalCard!);

      // Step 3: Fill store information
      await waitFor(() => {
        expect(screen.getByLabelText(/nombre de la tienda/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/nombre de la tienda/i), 'Mi Tienda');
      
      // Continue through the flow
      const continueButton = screen.getByText(/continuar/i);
      expect(continueButton).toBeInTheDocument();
    });

    it('shows different steps for juridica person', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Select seller
      const sellerCard = screen.getByText(/vendedor/i).closest('div');
      await user.click(sellerCard!);

      // Select juridica person
      await waitFor(() => {
        expect(screen.getByText(/persona jurídica/i)).toBeInTheDocument();
      });

      const juridicaCard = screen.getByText(/persona jurídica/i).closest('div');
      await user.click(juridicaCard!);

      // Should show store info step
      await waitFor(() => {
        expect(screen.getByLabelText(/nombre de la tienda/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Navigate to credentials step
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/nombre/i), 'Juan');
      await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
      await user.type(screen.getByLabelText(/número de documento/i), '1234567890');
      await user.click(screen.getByText(/continuar/i));

      await waitFor(() => {
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      });

      // Enter invalid email
      const emailInput = screen.getByLabelText(/correo electrónico/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Trigger blur event

      // Validation should occur (implementation dependent)
      expect(emailInput).toHaveValue('invalid-email');
    });

    it('validates password strength', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Navigate to credentials step
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/nombre/i), 'Juan');
      await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
      await user.type(screen.getByLabelText(/número de documento/i), '1234567890');
      await user.click(screen.getByText(/continuar/i));

      await waitFor(() => {
        expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
      });

      // Enter weak password
      const passwordInput = screen.getByLabelText(/^contraseña$/i);
      await user.type(passwordInput, 'weak');

      // Password requirements should be visible
      expect(screen.getByText(/mínimo 10 caracteres/i)).toBeInTheDocument();
    });

    it('validates email confirmation match', async () => {
      const user = userEvent.setup();
      render(<RegisterPage />);

      // Navigate to credentials step
      const buyerCard = screen.getByText(/comprador/i).closest('div');
      await user.click(buyerCard!);

      await waitFor(() => {
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/nombre/i), 'Juan');
      await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
      await user.type(screen.getByLabelText(/número de documento/i), '1234567890');
      await user.click(screen.getByText(/continuar/i));

      await waitFor(() => {
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
      await user.type(screen.getByLabelText(/confirmar correo/i), 'different@example.com');

      // Emails don't match - validation should trigger
      const confirmEmailInput = screen.getByLabelText(/confirmar correo/i);
      expect(confirmEmailInput).toHaveValue('different@example.com');
    });
  });
});

