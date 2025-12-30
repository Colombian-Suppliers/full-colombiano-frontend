// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import DashboardMetrics from './DashboardMetrics';

const meta = {
  title: 'Dashboard/DashboardMetrics',
  component: DashboardMetrics,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockStats = {
  totalSales: 125000,
  totalProducts: 45,
  pendingOrders: 8,
  averageRating: 4.7,
  totalReviews: 156,
};

export const Default: Story = {
  args: {
    stats: mockStats,
  },
};
