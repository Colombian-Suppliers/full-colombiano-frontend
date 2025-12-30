import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import StatCard from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Common/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the stat card',
    },
    value: {
      control: 'text',
      description: 'The main value to display',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle or additional context',
    },
    infoIcon: {
      control: 'boolean',
      description: 'Whether to show the info icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: 'Ventas',
    value: '$1,250,000',
    subtitle: 'Hoy',
    infoIcon: true,
  },
};

export const WithNumber: Story = {
  args: {
    title: 'Pedidos',
    value: 42,
    subtitle: 'Pendientes',
    infoIcon: true,
  },
};

export const WithoutInfo: Story = {
  args: {
    title: 'Productos',
    value: '156',
    subtitle: 'Total',
    infoIcon: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Próxima fecha de retiro',
    value: '25/11',
    subtitle: '',
    infoIcon: true,
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4" style={{ width: '800px' }}>
      <StatCard title="Ventas" value="$1,250,000" subtitle="Hoy" />
      <StatCard title="Pedidos" value={8} subtitle="Pendientes" />
      <StatCard title="Productos" value="45" subtitle="Activos" />
    </div>
  ),
};

