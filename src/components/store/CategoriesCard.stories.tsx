// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoriesCard from './CategoriesCard';

const meta = {
  title: 'Store/CategoriesCard',
  component: CategoriesCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoriesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
