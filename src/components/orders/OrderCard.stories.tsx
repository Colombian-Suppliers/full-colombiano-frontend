import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import OrderCard from './OrderCard';

const meta: Meta<typeof OrderCard> = {
  title: 'Orders/OrderCard',
  component: OrderCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderCard>;

const mockOrder = {
  id: 'order-1',
  orderNumber: '12345',
  buyerName: 'Juan Pérez',
  buyerAddress: 'Calle 123 #45-67, Bogotá',
  items: [
    { id: '1', productName: 'Café Especial', quantity: 2, price: 25000 },
    { id: '2', productName: 'Miel Orgánica', quantity: 1, price: 15000 },
  ],
  total: 65000,
  status: 'pending',
  createdAt: '2025-12-25T10:00:00Z',
};

export const Pending: Story = {
  args: {
    order: mockOrder,
    actionLabel: 'Ver Detalles',
    onAction: (id) => alert(`Viewing order ${id}`),
  },
};

export const Confirmed: Story = {
  args: {
    order: { ...mockOrder, status: 'confirmed' },
    actionLabel: 'Marcar como Enviado',
    onAction: (id) => alert(`Shipping order ${id}`),
  },
};

export const Shipped: Story = {
  args: {
    order: { ...mockOrder, status: 'shipped' },
    actionLabel: 'Ver Seguimiento',
    onAction: (id) => alert(`Tracking order ${id}`),
  },
};

export const Delivered: Story = {
  args: {
    order: { ...mockOrder, status: 'delivered' },
  },
};

export const Cancelled: Story = {
  args: {
    order: { ...mockOrder, status: 'cancelled' },
  },
};

export const ManyItems: Story = {
  args: {
    order: {
      ...mockOrder,
      items: [
        { id: '1', productName: 'Café Especial', quantity: 2, price: 25000 },
        { id: '2', productName: 'Miel Orgánica', quantity: 1, price: 15000 },
        { id: '3', productName: 'Chocolate Artesanal', quantity: 3, price: 12000 },
        { id: '4', productName: 'Arepa de Maíz', quantity: 5, price: 5000 },
      ],
      total: 101000,
    },
    actionLabel: 'Ver Detalles',
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxWidth: '900px' }}>
      <OrderCard order={{ ...mockOrder, status: 'pending' }} actionLabel="Confirmar" />
      <OrderCard order={{ ...mockOrder, status: 'confirmed' }} actionLabel="Enviar" />
      <OrderCard order={{ ...mockOrder, status: 'shipped' }} actionLabel="Seguimiento" />
      <OrderCard order={{ ...mockOrder, status: 'delivered' }} />
    </div>
  ),
};

