// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VariationsManager from './VariationsManager';

const meta = {
  title: 'Products/VariationsManager',
  component: VariationsManager,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VariationsManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
