// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DocumentCard from './DocumentCard';

const meta = {
  title: 'Store/DocumentCard',
  component: DocumentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
