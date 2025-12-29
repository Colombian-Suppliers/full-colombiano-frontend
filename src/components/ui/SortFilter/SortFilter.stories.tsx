// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import SortFilter from './SortFilter';

const meta = {
  title: 'Ui/SortFilter',
  component: SortFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SortFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
