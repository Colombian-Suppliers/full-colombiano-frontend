// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import AnalyticsComponents from './AnalyticsComponents';

const meta = {
  title: 'Dashboard/AnalyticsComponents',
  component: AnalyticsComponents,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalyticsComponents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
