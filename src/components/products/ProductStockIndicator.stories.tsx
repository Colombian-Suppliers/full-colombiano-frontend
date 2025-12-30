import type { Meta, StoryObj } from '@storybook/react';
import ProductStockIndicator from './ProductStockIndicator';

const meta: Meta<typeof ProductStock Indicator> = {
  title: 'Products/ProductStockIndicator',
  component: ProductStockIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductStockIndicator>;

export const InStock: Story = {
  args: {
    stock: 50,
  },
};

export const LowStock: Story = {
  args: {
    stock: 3,
    lowStockThreshold: 5,
  },
};

export const OutOfStock: Story = {
  args: {
    stock: 0,
  },
};

export const WithoutQuantity: Story = {
  args: {
    stock: 25,
    showQuantity: false,
  },
};

export const Small: Story = {
  args: {
    stock: 15,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    stock: 3,
    size: 'lg',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-gray-500 mb-2">Stock alto (50 unidades)</p>
        <ProductStockIndicator stock={50} />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Stock bajo (3 unidades)</p>
        <ProductStockIndicator stock={3} />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Agotado (0 unidades)</p>
        <ProductStockIndicator stock={0} />
      </div>
    </div>
  ),
};

