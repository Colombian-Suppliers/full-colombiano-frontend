// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import AnnouncementsDetail from './AnnouncementsDetail';

const meta = {
  title: 'Announcements/AnnouncementsDetail',
  component: AnnouncementsDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    announcement: {
      id: 1,
      title: 'Anuncio de Ejemplo',
      content: '<p>Este es el contenido del anuncio con <strong>formato HTML</strong>.</p>',
      date: '2024-01-15T10:00:00Z',
      isRead: false,
      priority: 'normal',
    },
    onBack: () => console.log('Back clicked'),
    onMarkAsRead: () => console.log('Mark as read'),
  },
};
