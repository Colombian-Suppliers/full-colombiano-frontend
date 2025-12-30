import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Step1PersonalInfo from './Step1PersonalInfo';

describe('Buyer Step1PersonalInfo', () => {
  const mockRegister = vi.fn((name) => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }));

  const mockWatch = vi.fn();
  const mockBack = vi.fn();
  const mockNext = vi.fn();

  const defaultProps = {
    register: mockRegister,
    errors: {},
    watch: mockWatch,
    back: mockBack,
    next: mockNext,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockWatch.mockReturnValue('CC');
  });

  it('renders personal information form fields', () => {
    render(<Step1PersonalInfo {...defaultProps} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de documento/i)).toBeInTheDocument();
  });

  it('displays document type options', () => {
    render(<Step1PersonalInfo {...defaultProps} />);

    const select = screen.getByLabelText(/tipo de documento/i);
    expect(select).toBeInTheDocument();

    // Check for CC, CE, Passport options
    expect(screen.getByRole('option', { name: /cédula de ciudadanía/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /cédula de extranjería/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /pasaporte/i })).toBeInTheDocument();
  });

  it('shows validation error for first name', () => {
    const props = {
      ...defaultProps,
      errors: {
        firstName: { message: 'El nombre es requerido' },
      },
    };

    render(<Step1PersonalInfo {...props} />);
    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
  });

  it('shows validation error for last name', () => {
    const props = {
      ...defaultProps,
      errors: {
        lastName: { message: 'El apellido es requerido' },
      },
    };

    render(<Step1PersonalInfo {...props} />);
    expect(screen.getByText(/el apellido es requerido/i)).toBeInTheDocument();
  });

  it('shows validation error for document number', () => {
    const props = {
      ...defaultProps,
      errors: {
        documentNumber: { message: 'El número de documento es inválido' },
      },
    };

    render(<Step1PersonalInfo {...props} />);
    expect(screen.getByText(/el número de documento es inválido/i)).toBeInTheDocument();
  });

  it('calls back function when back button is clicked', () => {
    render(<Step1PersonalInfo {...defaultProps} />);

    const backButton = screen.getByText(/volver/i);
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('calls next function when continue button is clicked', () => {
    render(<Step1PersonalInfo {...defaultProps} />);

    const continueButton = screen.getByText(/continuar/i);
    fireEvent.click(continueButton);

    expect(mockNext).toHaveBeenCalled();
  });

  it('displays correct placeholder for CC document type', () => {
    mockWatch.mockReturnValue('CC');
    render(<Step1PersonalInfo {...defaultProps} />);

    const input = screen.getByPlaceholderText(/ej: 1234567890/i);
    expect(input).toBeInTheDocument();
  });

  it('displays correct placeholder for CE document type', () => {
    mockWatch.mockReturnValue('CE');
    render(<Step1PersonalInfo {...defaultProps} />);

    const input = screen.getByPlaceholderText(/ej: 1234567890/i);
    expect(input).toBeInTheDocument();
  });

  it('displays correct placeholder for Passport document type', () => {
    mockWatch.mockReturnValue('PASSPORT');
    render(<Step1PersonalInfo {...defaultProps} />);

    const input = screen.getByPlaceholderText(/ej: AB123456/i);
    expect(input).toBeInTheDocument();
  });

  it('renders all form fields with proper labels', () => {
    render(<Step1PersonalInfo {...defaultProps} />);

    expect(screen.getByText(/información personal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toHaveAttribute('name', 'firstName');
    expect(screen.getByLabelText(/apellido/i)).toHaveAttribute('name', 'lastName');
    expect(screen.getByLabelText(/número de documento/i)).toHaveAttribute('name', 'documentNumber');
  });
});

