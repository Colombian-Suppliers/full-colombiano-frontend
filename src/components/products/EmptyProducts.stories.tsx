// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import EmptyProducts from './EmptyProducts';

const meta = {
  title: 'Products/EmptyProducts',
  component: EmptyProducts,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyProducts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
