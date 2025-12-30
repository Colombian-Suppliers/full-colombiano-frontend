// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Benefits from './Benefits';

const meta = {
  title: 'Landing/Benefits',
  component: Benefits,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Benefits>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
