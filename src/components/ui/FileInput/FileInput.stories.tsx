// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FileInput from './FileInput';

const meta = {
  title: 'Ui/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
