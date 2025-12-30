import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductStockIndicator from './ProductStockIndicator';

describe('ProductStockIndicator', () => {
  it('shows "En stock" when stock is high', () => {
    render(<ProductStockIndicator stock={50} />);
    expect(screen.getByText(/50 disponibles/)).toBeInTheDocument();
  });

  it('shows low stock warning when stock is below threshold', () => {
    render(<ProductStockIndicator stock={3} lowStockThreshold={5} />);
    expect(screen.getByText(/Solo 3 disponibles/)).toBeInTheDocument();
  });

  it('shows "Agotado" when stock is 0', () => {
    render(<ProductStockIndicator stock={0} />);
    expect(screen.getByText(/Agotado/)).toBeInTheDocument();
  });

  it('hides quantity when showQuantity is false', () => {
    render(<ProductStockIndicator stock={25} showQuantity={false} />);
    expect(screen.getByText(/En stock/)).toBeInTheDocument();
    expect(screen.queryByText(/25/)).not.toBeInTheDocument();
  });

  it('applies correct color classes for different stock levels', () => {
    const { container: highStock } = render(<ProductStockIndicator stock={50} />);
    expect(highStock.querySelector('.text-green-600')).toBeInTheDocument();

    const { container: lowStock } = render(<ProductStockIndicator stock={2} />);
    expect(lowStock.querySelector('.text-yellow-600')).toBeInTheDocument();

    const { container: outOfStock } = render(<ProductStockIndicator stock={0} />);
    expect(outOfStock.querySelector('.text-red-600')).toBeInTheDocument();
  });

  it('uses custom low stock threshold', () => {
    render(<ProductStockIndicator stock={8} lowStockThreshold={10} />);
    expect(screen.getByText(/Solo 8 disponibles/)).toBeInTheDocument();
  });
});

