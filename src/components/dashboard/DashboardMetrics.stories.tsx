// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import DashboardMetrics from './DashboardMetrics';

const meta = {
  title: 'Dashboard/DashboardMetrics',
  component: DashboardMetrics,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
