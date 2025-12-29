// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import CategorySelector from './CategorySelector';

const meta = {
  title: 'Ui/CategorySelector',
  component: CategorySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategorySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
