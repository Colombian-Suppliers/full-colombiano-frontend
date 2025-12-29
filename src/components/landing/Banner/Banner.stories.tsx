// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Banner from './Banner';

const meta = {
  title: 'Landing/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
