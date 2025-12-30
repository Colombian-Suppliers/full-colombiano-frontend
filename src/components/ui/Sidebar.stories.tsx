// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Sidebar from './Sidebar';

const meta = {
  title: 'Ui/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    chromatic: { disable: true },
  },
};
