import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MarketplacePage from '@/app/marketplace/page';

describe('MarketplacePage', () => {
  it('should render search bar and filters', () => {
    render(<MarketplacePage />);

    expect(
      screen.getByPlaceholderText('Buscar productos...')
    ).toBeInTheDocument();
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Moda y accesorios')).toBeInTheDocument();
  });

  it('should render product grid items', () => {
    render(<MarketplacePage />);
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
  });

  it('should have correct container structure', () => {
    const { container } = render(<MarketplacePage />);
    expect(container.firstChild).toHaveClass(
      'container',
      'mx-auto',
      'px-4',
      'py-8'
    );
  });
});
