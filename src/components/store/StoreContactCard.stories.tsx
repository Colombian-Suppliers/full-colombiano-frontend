// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoreContactCard from './StoreContactCard';

const meta = {
  title: 'Store/StoreContactCard',
  component: StoreContactCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
