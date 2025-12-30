import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('renders approved status correctly', () => {
    render(<StatusBadge status="approved" />);
    expect(screen.getByText(/Aprobado/)).toBeInTheDocument();
  });

  it('renders pending status correctly', () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText(/Pendiente/)).toBeInTheDocument();
  });

  it('renders rejected status correctly', () => {
    render(<StatusBadge status="rejected" />);
    expect(screen.getByText(/Rechazado/)).toBeInTheDocument();
  });

  it('applies correct color classes for approved status', () => {
    const { container } = render(<StatusBadge status="approved" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('applies correct color classes for pending status', () => {
    const { container } = render(<StatusBadge status="pending" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('applies correct color classes for rejected status', () => {
    const { container } = render(<StatusBadge status="rejected" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('uses custom status config when provided', () => {
    const customConfig = {
      custom: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'Personalizado',
      },
    };
    
    const { container } = render(
      <StatusBadge status="custom" statusConfig={customConfig} />
    );
    
    expect(screen.getByText(/Personalizado/)).toBeInTheDocument();
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('falls back to pending config for unknown status', () => {
    render(<StatusBadge status="unknown-status" />);
    expect(screen.getByText(/Pendiente/)).toBeInTheDocument();
  });
});

