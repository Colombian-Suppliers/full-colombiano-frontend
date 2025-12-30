import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import OrderStatusTimeline from './OrderStatusTimeline';

const meta: Meta<typeof OrderStatusTimeline> = {
  title: 'Orders/OrderStatusTimeline',
  component: OrderStatusTimeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderStatusTimeline>;

const steps = [
  { label: 'Pedido Recibido', date: '25 Dic, 10:00 AM', completed: true },
  { label: 'Confirmado', date: '25 Dic, 11:30 AM', completed: true },
  { label: 'En Preparación', completed: false, current: true },
  { label: 'Enviado', completed: false },
  { label: 'Entregado', completed: false },
];

export const Horizontal: Story = {
  args: {
    steps,
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    steps,
    orientation: 'vertical',
  },
};

export const AllCompleted: Story = {
  args: {
    steps: steps.map((step) => ({ ...step, completed: true, current: false })),
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export const JustStarted: Story = {
  args: {
    steps: [
      { label: 'Pedido Recibido', date: '25 Dic, 10:00 AM', completed: false, current: true },
      { label: 'Confirmado', completed: false },
      { label: 'Enviado', completed: false },
      { label: 'Entregado', completed: false },
    ],
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

