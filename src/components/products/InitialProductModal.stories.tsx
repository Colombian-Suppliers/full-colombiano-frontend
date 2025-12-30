// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InitialProductModal from './InitialProductModal';

const meta = {
  title: 'Products/InitialProductModal',
  component: InitialProductModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InitialProductModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
