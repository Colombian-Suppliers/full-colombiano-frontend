// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';

const meta = {
  title: 'Ui/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
