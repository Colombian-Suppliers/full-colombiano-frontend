// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FilterChips from './FilterChips';

const meta = {
  title: 'Ui/FilterChips',
  component: FilterChips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
