import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { useState } from 'react';
import QuantitySelector from './QuantitySelector';

const meta: Meta<typeof QuantitySelector> = {
  title: 'Common/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the selector',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

export const Default: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(1);
    return (
      <QuantitySelector
        {...args}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1);
    return (
      <QuantitySelector
        size="sm"
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(5);
    return (
      <QuantitySelector
        size="md"
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(10);
    return (
      <QuantitySelector
        size="lg"
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    );
  },
};

export const WithLimits: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(5);
    return (
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        min={1}
        max={10}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(3);
    return (
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        disabled={true}
      />
    );
  },
};

export const InProductCard: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1);
    return (
      <div className="bg-white border rounded-lg p-4 max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold">Cantidad:</span>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            max={10}
          />
        </div>
        <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold">
          Agregar al carrito - ${(29.99 * quantity).toFixed(2)}
        </button>
      </div>
    );
  },
};

