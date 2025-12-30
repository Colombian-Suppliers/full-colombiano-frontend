// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import RatingSummary from './RatingSummary';

const meta = {
  title: 'Ui/RatingSummary',
  component: RatingSummary,
  parameters: {
    layout: 'centered',
    chromatic: { delay: 2000 }, // Wait for animations
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RatingSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    averageRating: 4.5,
    totalReviews: 248,
    ratingBreakdown: {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2,
    },
  },
};

export const HighRating: Story = {
  args: {
    averageRating: 4.8,
    totalReviews: 1523,
    ratingBreakdown: {
      5: 85,
      4: 10,
      3: 3,
      2: 1,
      1: 1,
    },
  },
};

export const LowRating: Story = {
  args: {
    averageRating: 2.3,
    totalReviews: 89,
    ratingBreakdown: {
      5: 10,
      4: 15,
      3: 20,
      2: 30,
      1: 25,
    },
  },
};
