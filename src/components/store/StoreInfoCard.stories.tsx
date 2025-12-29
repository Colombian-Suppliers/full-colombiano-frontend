// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import StoreInfoCard from './StoreInfoCard';

const meta = {
  title: 'Store/StoreInfoCard',
  component: StoreInfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
