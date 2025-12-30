// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AddressCard from './AddressCard';

const meta = {
  title: 'Store/AddressCard',
  component: AddressCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
