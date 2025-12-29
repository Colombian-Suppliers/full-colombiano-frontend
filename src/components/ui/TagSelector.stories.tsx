// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import TagSelector from './TagSelector';

const meta = {
  title: 'Ui/TagSelector',
  component: TagSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
