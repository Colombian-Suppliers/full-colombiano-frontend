// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import StoreHero from './StoreHero';

const meta = {
  title: 'Store/StoreHero',
  component: StoreHero,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
