// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from './Input';

const meta = {
  title: 'Ui/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
