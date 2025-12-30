import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
  it('renders label correctly', () => {
    render(
      <FormField label="Test Label">
        <input />
      </FormField>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required asterisk when required is true', () => {
    render(
      <FormField label="Required Field" required>
        <input />
      </FormField>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show required asterisk when required is false', () => {
    render(
      <FormField label="Optional Field">
        <input />
      </FormField>
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('displays help text when provided', () => {
    render(
      <FormField label="Field" helpText="This is help text">
        <input />
      </FormField>
    );
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(
      <FormField label="Field" error="This is an error">
        <input />
      </FormField>
    );
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('hides help text when error is present', () => {
    render(
      <FormField
        label="Field"
        helpText="Help text"
        error="Error message"
      >
        <input />
      </FormField>
    );
    expect(screen.queryByText('Help text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <FormField label="Field">
        <input data-testid="test-input" />
      </FormField>
    );
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('links label to input with htmlFor', () => {
    render(
      <FormField label="Email" htmlFor="email-input">
        <input id="email-input" />
      </FormField>
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email-input');
  });
});

