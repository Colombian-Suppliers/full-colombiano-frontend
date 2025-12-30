import type { Meta, StoryObj } from '@storybook/react';
import ProductPrice from './ProductPrice';

const meta: Meta<typeof ProductPrice> = {
  title: 'Products/ProductPrice',
  component: ProductPrice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductPrice>;

export const Default: Story = {
  args: {
    price: 45000,
  },
};

export const WithDiscount: Story = {
  args: {
    price: 45000,
    originalPrice: 60000,
  },
};

export const LargePrice: Story = {
  args: {
    price: 1250000,
    size: 'lg',
  },
};

export const SmallPrice: Story = {
  args: {
    price: 25000,
    size: 'sm',
  },
};

export const BigDiscount: Story = {
  args: {
    price: 30000,
    originalPrice: 100000,
    size: 'lg',
  },
};

export const WithoutDiscountBadge: Story = {
  args: {
    price: 45000,
    originalPrice: 60000,
    showDiscount: false,
  },
};

export const PriceComparison: Story = {
  render: () => (
    <div className="space-y-4 bg-white p-6 rounded-lg">
      <div>
        <p className="text-xs text-gray-500 mb-1">Sin descuento</p>
        <ProductPrice price={45000} size="md" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Con descuento pequeño (25%)</p>
        <ProductPrice price={45000} originalPrice={60000} size="md" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Con descuento grande (50%)</p>
        <ProductPrice price={50000} originalPrice={100000} size="md" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Precio grande con descuento</p>
        <ProductPrice price={1000000} originalPrice={1500000} size="lg" />
      </div>
    </div>
  ),
};

