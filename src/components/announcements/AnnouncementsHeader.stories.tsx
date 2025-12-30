// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnnouncementsHeader from './AnnouncementsHeader';

const meta = {
  title: 'Announcements/AnnouncementsHeader',
  component: AnnouncementsHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: {
      totalAnnouncements: 24,
      unreadCount: 5,
      readCount: 19,
    },
  },
};

export const NoUnread: Story = {
  args: {
    stats: {
      totalAnnouncements: 24,
      unreadCount: 0,
      readCount: 24,
    },
  },
};

export const AllUnread: Story = {
  args: {
    stats: {
      totalAnnouncements: 24,
      unreadCount: 24,
      readCount: 0,
    },
  },
};
