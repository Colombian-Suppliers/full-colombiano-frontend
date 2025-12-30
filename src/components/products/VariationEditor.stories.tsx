// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VariationEditor from './VariationEditor';

const meta = {
  title: 'Products/VariationEditor',
  component: VariationEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VariationEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockVariation = {
  id: '1',
  attributes: [
    { name: 'Color', value: 'Rojo' },
    { name: 'Talla', value: 'M' },
  ],
  price: 25000,
  inventory: 10,
  sku: 'PROD-RED-M',
};

export const Default: Story = {
  args: {
    variation: mockVariation,
    onClose: () => console.log('Close clicked'),
    onSave: (variation) => console.log('Save clicked', variation),
  },
};
