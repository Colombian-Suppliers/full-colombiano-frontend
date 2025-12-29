// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import DashboardHeader from './DashboardHeader';

const meta = {
  title: 'Ui/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
