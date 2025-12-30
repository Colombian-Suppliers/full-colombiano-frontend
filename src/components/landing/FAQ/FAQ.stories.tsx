// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FAQ from './FAQ';

const meta = {
  title: 'Landing/FAQ',
  component: FAQ,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
