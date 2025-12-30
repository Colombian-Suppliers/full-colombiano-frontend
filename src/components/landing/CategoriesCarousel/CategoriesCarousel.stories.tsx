// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoriesCarousel from './CategoriesCarousel';

const meta = {
  title: 'Landing/CategoriesCarousel',
  component: CategoriesCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoriesCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
