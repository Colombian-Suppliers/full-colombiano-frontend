// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import AboutUs from './AboutUs';

const meta = {
  title: 'Landing/AboutUs',
  component: AboutUs,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AboutUs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
