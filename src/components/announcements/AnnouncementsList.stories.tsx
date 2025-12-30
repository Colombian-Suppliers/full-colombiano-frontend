// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnnouncementsList from './AnnouncementsList';

const meta = {
  title: 'Announcements/AnnouncementsList',
  component: AnnouncementsList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAnnouncements = [
  {
    id: 1,
    title: 'Nueva actualización de la plataforma',
    content: '<p>Hemos lanzado nuevas funcionalidades para mejorar tu experiencia.</p>',
    date: '2024-01-15T10:00:00Z',
    created_date: '2024-01-15T10:00:00Z',
    isRead: false,
    read: false,
    priority: 'high',
    category: 'Actualizaciones',
  },
  {
    id: 2,
    title: 'Promoción especial del mes',
    content: '<p>Aprovecha nuestras ofertas exclusivas este mes.</p>',
    date: '2024-01-14T10:00:00Z',
    created_date: '2024-01-14T10:00:00Z',
    isRead: true,
    read: true,
    priority: 'normal',
    category: 'Promociones',
  },
  {
    id: 3,
    title: 'Mantenimiento programado',
    content: '<p>El sistema estará en mantenimiento el próximo domingo.</p>',
    date: '2024-01-13T10:00:00Z',
    created_date: '2024-01-13T10:00:00Z',
    isRead: false,
    read: false,
    priority: 'medium',
    category: 'Mantenimiento',
  },
];

export const Default: Story = {
  args: {
    announcements: mockAnnouncements,
    filteredAnnouncements: mockAnnouncements,
    selectedAnnouncement: null,
    selectedAnnouncements: new Set(),
    onAnnouncementClick: (announcement) => console.log('Click:', announcement),
    onSelectAll: () => console.log('Select all'),
    onSelectAnnouncement: (id) => console.log('Select:', id),
    hideHeader: false,
  },
};

export const WithSelection: Story = {
  args: {
    announcements: mockAnnouncements,
    filteredAnnouncements: mockAnnouncements,
    selectedAnnouncement: mockAnnouncements[0],
    selectedAnnouncements: new Set([1, 3]),
    onAnnouncementClick: (announcement) => console.log('Click:', announcement),
    onSelectAll: () => console.log('Select all'),
    onSelectAnnouncement: (id) => console.log('Select:', id),
    hideHeader: false,
  },
};

export const Empty: Story = {
  args: {
    announcements: [],
    filteredAnnouncements: [],
    selectedAnnouncement: null,
    selectedAnnouncements: new Set(),
    onAnnouncementClick: (announcement) => console.log('Click:', announcement),
    onSelectAll: () => console.log('Select all'),
    onSelectAnnouncement: (id) => console.log('Select:', id),
    hideHeader: false,
  },
};
