import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar onChange={() => {}} placeholder="Buscar productos" />);
    expect(screen.getByPlaceholderText('Buscar productos')).toBeInTheDocument();
  });

  it('displays initial value', () => {
    render(<SearchBar value="test" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test');
  });

  it('calls onChange after debounce delay', async () => {
    const handleChange = vi.fn();
    render(<SearchBar onChange={handleChange} debounceMs={100} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Should not call immediately
    expect(handleChange).not.toHaveBeenCalled();
    
    // Should call after debounce
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith('test'), {
      timeout: 200,
    });
  });

  it('shows clear button when value is not empty', () => {
    const { container } = render(<SearchBar value="test" onChange={() => {}} />);
    const clearButton = container.querySelector('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('hides clear button when value is empty', () => {
    const { container } = render(<SearchBar value="" onChange={() => {}} />);
    const clearButton = container.querySelector('button');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears value when clear button is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(<SearchBar value="test" onChange={handleChange} />);
    
    const clearButton = container.querySelector('button');
    fireEvent.click(clearButton!);
    
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('updates local value immediately on input', () => {
    render(<SearchBar onChange={() => {}} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(input.value).toBe('new value');
  });
});

