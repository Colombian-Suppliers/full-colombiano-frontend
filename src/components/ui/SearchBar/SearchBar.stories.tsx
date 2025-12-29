// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import SearchBar from './SearchBar';

const meta = {
  title: 'Ui/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
