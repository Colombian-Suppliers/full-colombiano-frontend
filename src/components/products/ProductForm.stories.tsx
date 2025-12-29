// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductForm from './ProductForm';

const meta = {
  title: 'Products/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
