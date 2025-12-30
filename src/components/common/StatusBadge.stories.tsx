import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Common/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['approved', 'pending', 'rejected', 'completed', 'shipped'],
      description: 'The status to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Approved: Story = {
  args: {
    status: 'approved',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Rejected: Story = {
  args: {
    status: 'rejected',
  },
};

export const Completed: Story = {
  args: {
    status: 'completed',
  },
};

export const Shipped: Story = {
  args: {
    status: 'shipped',
  },
};

export const CustomConfig: Story = {
  args: {
    status: 'custom',
    statusConfig: {
      custom: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        label: 'Personalizado',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge status="approved" />
      <StatusBadge status="pending" />
      <StatusBadge status="rejected" />
      <StatusBadge status="completed" />
      <StatusBadge status="shipped" />
    </div>
  ),
};

