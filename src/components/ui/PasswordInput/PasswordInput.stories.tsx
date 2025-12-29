// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import PasswordInput from './PasswordInput';

const meta = {
  title: 'Ui/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
