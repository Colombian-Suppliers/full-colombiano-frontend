// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  MetricBarChart,
  MetricLineChart,
  MetricAreaChart,
  MetricPieChart,
  MetricCard,
  KPICard,
} from './ChartComponents';

// Sample data for charts
const barData = [
  { name: 'Ene', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'May', value: 500 },
];

const pieData = [
  { name: 'Categoría A', value: 400, color: 'primary' },
  { name: 'Categoría B', value: 300, color: 'secondary' },
  { name: 'Categoría C', value: 300, color: 'accent' },
  { name: 'Categoría D', value: 200, color: 'info' },
];

const meta = {
  title: 'Dashboard/ChartComponents',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const BarChart: StoryObj = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <MetricBarChart data={barData} dataKey="value" color="primary" />
    </div>
  ),
};

export const LineChart: StoryObj = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <MetricLineChart data={barData} dataKey="value" color="info" />
    </div>
  ),
};

export const AreaChart: StoryObj = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <MetricAreaChart data={barData} dataKey="value" color="success" />
    </div>
  ),
};

export const PieChart: StoryObj = {
  render: () => (
    <div style={{ width: '400px', height: '400px' }}>
      <MetricPieChart data={pieData} />
    </div>
  ),
};

export const MetricCardExample: StoryObj = {
  render: () => (
    <MetricCard
      title="Total Ventas"
      value="$45,231"
      subtitle="Últimos 30 días"
      icon="📊"
      color="primary"
      trend="up"
      trendValue="+12.5%"
    />
  ),
};

export const KPICardExample: StoryObj = {
  render: () => (
    <KPICard
      title="Nuevos Clientes"
      value="1,234"
      change="+23.5%"
      changeType="positive"
      icon="👥"
    />
  ),
};
