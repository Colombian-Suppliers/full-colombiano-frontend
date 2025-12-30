import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Step3Credentials from './Step3Credentials';

describe('Buyer Step3Credentials', () => {
  const mockRegister = vi.fn((name) => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }));

  const mockWatch = vi.fn();
  const mockBack = vi.fn();

  const defaultProps = {
    register: mockRegister,
    errors: {},
    watch: mockWatch,
    back: mockBack,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockWatch.mockImplementation((field) => {
      if (field === 'email') return 'test@example.com';
      if (field === 'password') return 'SecurePass123!';
      return '';
    });
  });

  it('renders credentials form fields', () => {
    render(<Step3Credentials {...defaultProps} />);

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  });

  it('displays password requirements', () => {
    render(<Step3Credentials {...defaultProps} />);

    expect(screen.getByText(/requisitos de contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/mínimo 10 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/una mayúscula/i)).toBeInTheDocument();
    expect(screen.getByText(/una minúscula/i)).toBeInTheDocument();
    expect(screen.getByText(/un número/i)).toBeInTheDocument();
    expect(screen.getByText(/un carácter especial/i)).toBeInTheDocument();
  });

  it('shows validation error for email', () => {
    const props = {
      ...defaultProps,
      errors: {
        email: { message: 'El correo electrónico es inválido' },
      },
    };

    render(<Step3Credentials {...props} />);
    expect(screen.getByText(/el correo electrónico es inválido/i)).toBeInTheDocument();
  });

  it('shows validation error for password', () => {
    const props = {
      ...defaultProps,
      errors: {
        password: { message: 'La contraseña no cumple los requisitos' },
      },
    };

    render(<Step3Credentials {...props} />);
    expect(screen.getByText(/la contraseña no cumple los requisitos/i)).toBeInTheDocument();
  });

  it('displays terms and conditions checkbox', () => {
    render(<Step3Credentials {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText(/acepto los términos y condiciones/i)).toBeInTheDocument();
  });

  it('shows error when terms are not accepted', () => {
    const props = {
      ...defaultProps,
      errors: {
        terms: { message: 'Debes aceptar los términos y condiciones' },
      },
    };

    render(<Step3Credentials {...props} />);
    expect(screen.getByText(/debes aceptar los términos y condiciones/i)).toBeInTheDocument();
  });

  it('calls back function when back button is clicked', () => {
    render(<Step3Credentials {...defaultProps} />);

    const backButton = screen.getByText(/volver/i);
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('disables submit button when loading', () => {
    const props = {
      ...defaultProps,
      isLoading: true,
    };

    render(<Step3Credentials {...props} />);

    const submitButton = screen.getByRole('button', { name: /registrarse/i });
    expect(submitButton).toBeDisabled();
  });

  it('shows loading text when submitting', () => {
    const props = {
      ...defaultProps,
      isLoading: true,
    };

    render(<Step3Credentials {...props} />);

    expect(screen.getByText(/registrando.../i)).toBeInTheDocument();
  });

  it('renders privacy policy link', () => {
    render(<Step3Credentials {...defaultProps} />);

    const privacyLink = screen.getByText(/política de privacidad/i);
    expect(privacyLink).toHaveAttribute('href');
  });

  it('validates email format', () => {
    mockWatch.mockImplementation((field) => {
      if (field === 'email') return 'invalid-email';
      return '';
    });

    render(<Step3Credentials {...defaultProps} />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    expect(emailInput).toHaveValue('invalid-email');
  });

  it('checks password strength indicators', () => {
    mockWatch.mockImplementation((field) => {
      if (field === 'password') return 'Weak123';
      return '';
    });

    render(<Step3Credentials {...defaultProps} />);

    // Password requirements should be visible
    expect(screen.getByText(/mínimo 10 caracteres/i)).toBeInTheDocument();
  });
});

