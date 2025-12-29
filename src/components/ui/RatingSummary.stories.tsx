// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import RatingSummary from './RatingSummary';

const meta = {
  title: 'Ui/RatingSummary',
  component: RatingSummary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RatingSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
