import type { Meta, StoryObj } from '@storybook/react';
import ProductImage from './ProductImage';

const meta: Meta<typeof ProductImage> = {
  title: 'Products/ProductImage',
  component: ProductImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductImage>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/300x300?text=Producto',
    alt: 'Producto de ejemplo',
  },
};

export const Small: Story = {
  args: {
    src: 'https://via.placeholder.com/300x300?text=Producto',
    alt: 'Producto pequeño',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    src: 'https://via.placeholder.com/300x300?text=Producto',
    alt: 'Producto grande',
    size: 'lg',
  },
};

export const NoImage: Story = {
  args: {
    alt: 'Sin imagen',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url.com/image.jpg',
    alt: 'Imagen rota',
  },
};

export const NotRounded: Story = {
  args: {
    src: 'https://via.placeholder.com/300x300?text=Producto',
    alt: 'Sin bordes redondeados',
    rounded: false,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <ProductImage src="https://via.placeholder.com/300" alt="XS" size="xs" />
        <p className="text-xs mt-1">XS</p>
      </div>
      <div className="text-center">
        <ProductImage src="https://via.placeholder.com/300" alt="SM" size="sm" />
        <p className="text-xs mt-1">SM</p>
      </div>
      <div className="text-center">
        <ProductImage src="https://via.placeholder.com/300" alt="MD" size="md" />
        <p className="text-xs mt-1">MD</p>
      </div>
      <div className="text-center">
        <ProductImage src="https://via.placeholder.com/300" alt="LG" size="lg" />
        <p className="text-xs mt-1">LG</p>
      </div>
      <div className="text-center">
        <ProductImage src="https://via.placeholder.com/300" alt="XL" size="xl" />
        <p className="text-xs mt-1">XL</p>
      </div>
    </div>
  ),
};

