// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import ReviewFilters from './ReviewFilters';

const meta = {
  title: 'Ui/ReviewFilters',
  component: ReviewFilters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
