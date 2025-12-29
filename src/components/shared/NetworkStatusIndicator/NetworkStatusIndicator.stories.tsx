// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import NetworkStatusIndicator from './NetworkStatusIndicator';

const meta = {
  title: 'Shared/NetworkStatusIndicator',
  component: NetworkStatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NetworkStatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
