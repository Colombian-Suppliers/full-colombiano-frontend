import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('should render hero section', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /Full Colombiano/i, level: 1 })
    ).toBeInTheDocument();

    const heroDescription = screen.getByText((_, node) => {
      if (!node || node.tagName !== 'P') return false;
      const text = node.textContent ?? '';
      return (
        /Somos un centro comercial virtual/i.test(text) &&
        /Full Bacano/i.test(text)
      );
    });
    expect(heroDescription).toBeInTheDocument();

    expect(screen.getByText('REGISTRATE')).toBeInTheDocument();
    expect(screen.getByText('CONOCE MAS')).toBeInTheDocument();
  });

  it('should render features section', () => {
    render(<HomePage />);

    expect(screen.getByText('Nuestros')).toBeInTheDocument();
    expect(screen.getByText('Beneficios')).toBeInTheDocument();
    expect(screen.getByText(/Visibilidad nacional/i)).toBeInTheDocument();
    expect(screen.getByText(/Pagos seguros/i)).toBeInTheDocument();
    expect(screen.getByText(/Logistica confiable/i)).toBeInTheDocument();
  });

  it('should render CTA section', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /Crear cuenta/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Natural')).toBeInTheDocument();
    expect(screen.getByText('Juridico')).toBeInTheDocument();
  });
});
