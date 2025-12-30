// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HomeRedirect from './HomeRedirect';

const meta = {
  title: 'Shared/HomeRedirect',
  component: HomeRedirect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeRedirect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
