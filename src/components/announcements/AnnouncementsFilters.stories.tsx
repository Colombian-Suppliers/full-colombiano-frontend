// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnnouncementsFilters from './AnnouncementsFilters';

const meta = {
  title: 'Announcements/AnnouncementsFilters',
  component: AnnouncementsFilters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnnouncementsFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchTerm: '',
    onSearchChange: (term) => console.log('Search:', term),
    selectedCategory: 'all',
    onCategoryChange: (category) => console.log('Category:', category),
    categories: ['Actualizaciones', 'Promociones', 'Mantenimiento', 'Noticias'],
    selectedStatus: 'all',
    onStatusChange: (status) => console.log('Status:', status),
    sortBy: 'date_desc',
    onSortChange: (sort) => console.log('Sort:', sort),
    hasActiveFilters: false,
    onClearFilters: () => console.log('Clear filters'),
    filterSummary: [],
  },
};

export const WithFilters: Story = {
  args: {
    searchTerm: 'promoción',
    onSearchChange: (term) => console.log('Search:', term),
    selectedCategory: 'Promociones',
    onCategoryChange: (category) => console.log('Category:', category),
    categories: ['Actualizaciones', 'Promociones', 'Mantenimiento', 'Noticias'],
    selectedStatus: 'unread',
    onStatusChange: (status) => console.log('Status:', status),
    sortBy: 'date_desc',
    onSortChange: (sort) => console.log('Sort:', sort),
    hasActiveFilters: true,
    onClearFilters: () => console.log('Clear filters'),
    filterSummary: ['Categoría: Promociones', 'Estado: No leídos', 'Búsqueda: promoción'],
  },
};
