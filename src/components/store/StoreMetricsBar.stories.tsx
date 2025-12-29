// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import StoreMetricsBar from './StoreMetricsBar';

const meta = {
  title: 'Store/StoreMetricsBar',
  component: StoreMetricsBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreMetricsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
