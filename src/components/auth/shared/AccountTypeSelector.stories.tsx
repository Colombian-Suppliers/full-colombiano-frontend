// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import AccountTypeSelector from './AccountTypeSelector';

const meta = {
  title: 'Auth/Shared/AccountTypeSelector',
  component: AccountTypeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccountTypeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock form state
const mockFormState = {
  role: '',
};

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => mockFormState[field],
    next: () => console.log('Next step'),
    setValue: (field, value) => {
      mockFormState[field] = value;
      console.log('Set value:', field, value);
    },
  },
};

export const BuyerSelected: Story = {
  args: {
    register: () => ({}),
    watch: (field) => (field === 'role' ? 'buyer' : ''),
    next: () => console.log('Next step'),
    setValue: (field, value) => console.log('Set value:', field, value),
  },
};

export const SellerSelected: Story = {
  args: {
    register: () => ({}),
    watch: (field) => (field === 'role' ? 'seller' : ''),
    next: () => console.log('Next step'),
    setValue: (field, value) => console.log('Set value:', field, value),
  },
};
