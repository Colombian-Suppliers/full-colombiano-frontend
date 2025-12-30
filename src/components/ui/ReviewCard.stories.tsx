// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ReviewCard from './ReviewCard';

const meta = {
  title: 'Ui/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    review: {
      id: 1,
      user: {
        name: 'Juan Pérez',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      rating: 5,
      date: '2024-01-15',
      comment: 'Excelente producto, muy buena calidad y llegó a tiempo. Lo recomiendo 100%.',
      helpful: 12,
      verified: true,
    },
  },
};

export const FourStars: Story = {
  args: {
    review: {
      id: 2,
      user: {
        name: 'María González',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      rating: 4,
      date: '2024-01-10',
      comment: 'Buen producto, aunque esperaba un poco más por el precio.',
      helpful: 8,
      verified: true,
    },
  },
};

export const WithoutAvatar: Story = {
  args: {
    review: {
      id: 3,
      user: {
        name: 'Carlos Rodríguez',
      },
      rating: 5,
      date: '2024-01-05',
      comment: 'Perfecto, justo lo que necesitaba.',
      helpful: 5,
      verified: false,
    },
  },
};
