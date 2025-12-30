// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Textarea from './Textarea';

const meta = {
  title: 'Ui/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
