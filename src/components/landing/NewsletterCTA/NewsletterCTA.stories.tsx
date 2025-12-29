// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import NewsletterCTA from './NewsletterCTA';

const meta = {
  title: 'Landing/NewsletterCTA',
  component: NewsletterCTA,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewsletterCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
