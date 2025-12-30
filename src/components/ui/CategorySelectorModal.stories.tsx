// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategorySelectorModal from './CategorySelectorModal';

const meta = {
  title: 'Ui/CategorySelectorModal',
  component: CategorySelectorModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategorySelectorModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories = [
  {
    id: 1,
    name: 'Artesanías',
    parent: 0,
    children: [
      {
        id: 11,
        name: 'Cerámica',
        parent: 1,
        children: [
          { id: 111, name: 'Vajillas', parent: 11, children: [] },
          { id: 112, name: 'Decoración', parent: 11, children: [] },
        ],
      },
      {
        id: 12,
        name: 'Textiles',
        parent: 1,
        children: [
          { id: 121, name: 'Ruanas', parent: 12, children: [] },
          { id: 122, name: 'Mochilas', parent: 12, children: [] },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Joyería',
    parent: 0,
    children: [
      { id: 21, name: 'Collares', parent: 2, children: [] },
      { id: 22, name: 'Aretes', parent: 2, children: [] },
    ],
  },
  {
    id: 3,
    name: 'Alimentos',
    parent: 0,
    children: [],
  },
];

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close'),
    categories: mockCategories,
    breadcrumb: [],
    isTransitioning: false,
    searchTerm: '',
    searchResults: [],
    onSearchTermChange: (term) => console.log('Search:', term),
    onSearchSelect: (category) => console.log('Select:', category),
    onCategorySelect: (category) => console.log('Category:', category),
    onSelectCurrent: () => console.log('Confirm'),
    onBreadcrumbClick: (index) => console.log('Breadcrumb:', index),
    getBreadcrumbForCategory: (category) => [category],
  },
};

export const WithBreadcrumb: Story = {
  args: {
    ...Default.args,
    breadcrumb: [
      {
        id: 1,
        name: 'Artesanías',
        children: mockCategories[0].children,
      },
    ],
  },
};
