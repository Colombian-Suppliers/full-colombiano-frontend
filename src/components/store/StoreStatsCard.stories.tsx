// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import StoreStatsCard from './StoreStatsCard';

const meta = {
  title: 'Store/StoreStatsCard',
  component: StoreStatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
