import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ReviewCard from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Reviews/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

const mockReview = {
  id: 'review-1',
  authorName: 'María González',
  authorAvatar: 'https://via.placeholder.com/100',
  rating: 5,
  comment: 'Excelente producto! La calidad es increíble y llegó muy rápido. Lo recomiendo 100%.',
  createdAt: '2025-12-20T10:00:00Z',
  verified: true,
  productName: 'Café Especial de Origen',
  helpfulCount: 12,
};

export const Default: Story = {
  args: {
    review: mockReview,
    onReply: (id) => alert(`Replying to ${id}`),
    onMarkHelpful: (id) => alert(`Marked ${id} as helpful`),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutAvatar: Story = {
  args: {
    review: { ...mockReview, authorAvatar: undefined },
    onReply: (id) => alert(`Replying to ${id}`),
    onMarkHelpful: (id) => alert(`Marked ${id} as helpful`),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NotVerified: Story = {
  args: {
    review: { ...mockReview, verified: false },
    onReply: (id) => alert(`Replying to ${id}`),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LowRating: Story = {
  args: {
    review: {
      ...mockReview,
      rating: 2,
      comment: 'El producto no cumplió mis expectativas. La calidad podría mejorar.',
    },
    onReply: (id) => alert(`Replying to ${id}`),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithProductName: Story = {
  args: {
    review: mockReview,
    showProduct: true,
    onReply: (id) => alert(`Replying to ${id}`),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const MultipleReviews: Story = {
  render: () => (
    <div className="space-y-4" style={{ maxWidth: '600px' }}>
      <ReviewCard
        review={{ ...mockReview, rating: 5 }}
        onReply={(id) => alert(`Replying to ${id}`)}
      />
      <ReviewCard
        review={{ ...mockReview, id: 'review-2', rating: 4, authorName: 'Carlos Ruiz', verified: false }}
        onReply={(id) => alert(`Replying to ${id}`)}
      />
      <ReviewCard
        review={{ ...mockReview, id: 'review-3', rating: 3, authorName: 'Ana López' }}
        onReply={(id) => alert(`Replying to ${id}`)}
      />
    </div>
  ),
};

