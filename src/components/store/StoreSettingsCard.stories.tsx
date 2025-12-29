// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import StoreSettingsCard from './StoreSettingsCard';

const meta = {
  title: 'Store/StoreSettingsCard',
  component: StoreSettingsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreSettingsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
