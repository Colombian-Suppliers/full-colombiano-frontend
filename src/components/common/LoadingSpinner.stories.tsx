import type { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the spinner',
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'gray'],
      description: 'The color of the spinner',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const WithMessage: Story = {
  args: {
    size: 'lg',
    message: 'Cargando productos...',
  },
};

export const Centered: Story = {
  args: {
    centered: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '300px', border: '1px solid #ccc' }}>
        <Story />
      </div>
    ),
  ],
};

export const White: Story = {
  args: {
    size: 'lg',
    color: 'white',
    message: 'Procesando...',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#1f2937', padding: '2rem', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Gray: Story = {
  args: {
    size: 'md',
    color: 'gray',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="sm" />
        <p className="text-xs">Small</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="md" />
        <p className="text-xs">Medium</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-xs">Large</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="xl" />
        <p className="text-xs">Extra Large</p>
      </div>
    </div>
  ),
};

