import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Common/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'The emoji or icon to display',
    },
    title: {
      control: 'text',
      description: 'The main title',
    },
    description: {
      control: 'text',
      description: 'The description text',
    },
    actionLabel: {
      control: 'text',
      description: 'The action button label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const EmptyCart: Story = {
  args: {
    icon: '🛒',
    title: 'Tu carrito está vacío',
    description: '¡Explora nuestro marketplace y agrega algunos productos!',
    actionLabel: 'Explorar Productos',
    onAction: () => alert('Navigating to products...'),
  },
};

export const NoProducts: Story = {
  args: {
    icon: '📦',
    title: 'No tienes productos aún',
    description: 'Comienza agregando tu primer producto para venderlo en el marketplace',
    actionLabel: 'Agregar Producto',
    onAction: () => alert('Opening product form...'),
  },
};

export const NoReviews: Story = {
  args: {
    icon: '💬',
    title: 'No hay reseñas aún',
    description: '¡Sé el primero en opinar sobre este producto!',
    actionLabel: 'Escribir Reseña',
    onAction: () => alert('Opening review form...'),
  },
};

export const WithoutAction: Story = {
  args: {
    icon: '🔍',
    title: 'No se encontraron resultados',
    description: 'Intenta ajustar tus filtros o términos de búsqueda',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '⚠️',
    title: 'Error al cargar datos',
    description: 'No pudimos cargar la información. Por favor, intenta nuevamente.',
    actionLabel: 'Reintentar',
    onAction: () => alert('Retrying...'),
  },
};

