// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnnouncementsActions from './AnnouncementsActions';

const meta = {
  title: 'Announcements/AnnouncementsActions',
  component: AnnouncementsActions,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedCount: 3,
    markingAsRead: new Set(),
    onMarkSelectedAsRead: () => console.log('Mark as read'),
    onMarkSelectedAsUnread: () => console.log('Mark as unread'),
    onCancelSelection: () => console.log('Cancel selection'),
  },
};

export const Loading: Story = {
  args: {
    selectedCount: 5,
    markingAsRead: new Set(['batch']),
    onMarkSelectedAsRead: () => console.log('Mark as read'),
    onMarkSelectedAsUnread: () => console.log('Mark as unread'),
    onCancelSelection: () => console.log('Cancel selection'),
  },
};
