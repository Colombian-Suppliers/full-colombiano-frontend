import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
  it('renders correct number of stars', () => {
    const { container } = render(<StarRating rating={3} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('displays filled stars for whole numbers', () => {
    const { container } = render(<StarRating rating={4} />);
    const filledStars = container.querySelectorAll('.text-yellow-400');
    expect(filledStars.length).toBeGreaterThanOrEqual(4);
  });

  it('shows rating value when showValue is true', () => {
    render(<StarRating rating={4.5} showValue />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('hides rating value when showValue is false', () => {
    render(<StarRating rating={4.5} showValue={false} />);
    expect(screen.queryByText('4.5')).not.toBeInTheDocument();
  });

  it('calls onChange when clicked in interactive mode', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <StarRating rating={0} readonly={false} onChange={handleChange} />
    );
    
    const stars = container.querySelectorAll('span');
    fireEvent.click(stars[2]); // Click 3rd star
    
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange in readonly mode', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <StarRating rating={3} readonly={true} onChange={handleChange} />
    );
    
    const stars = container.querySelectorAll('span');
    fireEvent.click(stars[4]);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { container, rerender } = render(<StarRating rating={4} size="sm" />);
    let stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-4', 'h-4');
    });

    rerender(<StarRating rating={4} size="lg" />);
    stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveClass('w-6', 'h-6');
    });
  });
});

