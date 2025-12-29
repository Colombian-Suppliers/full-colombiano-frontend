// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import ChartComponents from './ChartComponents';

const meta = {
  title: 'Dashboard/ChartComponents',
  component: ChartComponents,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartComponents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
