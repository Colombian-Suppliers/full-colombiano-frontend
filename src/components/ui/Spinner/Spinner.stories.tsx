// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Spinner from './Spinner';

const meta = {
  title: 'Ui/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
