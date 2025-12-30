import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import StarRating from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Common/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'The rating value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the stars',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const FiveStars: Story = {
  args: {
    rating: 5,
    showValue: true,
  },
};

export const FourPointFive: Story = {
  args: {
    rating: 4.5,
    showValue: true,
  },
};

export const ThreeStars: Story = {
  args: {
    rating: 3,
    showValue: true,
  },
};

export const OnePointFive: Story = {
  args: {
    rating: 1.5,
    showValue: true,
  },
};

export const Small: Story = {
  args: {
    rating: 4,
    size: 'sm',
    showValue: true,
  },
};

export const Large: Story = {
  args: {
    rating: 4.5,
    size: 'lg',
    showValue: true,
  },
};

export const WithoutValue: Story = {
  args: {
    rating: 3.5,
    showValue: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    return (
      <div className="flex flex-col gap-4">
        <StarRating
          rating={rating}
          readonly={false}
          onChange={setRating}
          showValue={true}
        />
        <p className="text-sm text-gray-600">
          Haz clic en una estrella para calificar
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-gray-600 mb-1">Small</p>
        <StarRating rating={4} size="sm" />
      </div>
      <div>
        <p className="text-xs text-gray-600 mb-1">Medium</p>
        <StarRating rating={4} size="md" />
      </div>
      <div>
        <p className="text-xs text-gray-600 mb-1">Large</p>
        <StarRating rating={4} size="lg" />
      </div>
    </div>
  ),
};

