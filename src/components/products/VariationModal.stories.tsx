// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VariationModal from './VariationModal';

const meta = {
  title: 'Products/VariationModal',
  component: VariationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VariationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
