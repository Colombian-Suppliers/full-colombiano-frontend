// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import AttributePicker from './AttributePicker';

const meta = {
  title: 'Products/AttributePicker',
  component: AttributePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AttributePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
