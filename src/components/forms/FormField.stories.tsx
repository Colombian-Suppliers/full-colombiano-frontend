import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';
import Input from '@/components/ui/Input/Input';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Nombre del producto',
    children: <Input placeholder="Ej: Café Premium" />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    label: 'Correo electrónico',
    required: true,
    children: <Input type="email" placeholder="correo@ejemplo.com" />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHelpText: Story = {
  args: {
    label: 'Contraseña',
    helpText: 'Mínimo 8 caracteres, una mayúscula y un número',
    children: <Input type="password" />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: 'Precio',
    error: 'El precio debe ser mayor a $0',
    children: <Input type="number" value="0" />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CompleteForm: Story = {
  render: () => (
    <div style={{ width: '400px' }} className="space-y-4">
      <FormField label="Nombre" required>
        <Input placeholder="Tu nombre" />
      </FormField>
      <FormField label="Email" required error="El email no es válido">
        <Input type="email" value="invalid-email" />
      </FormField>
      <FormField label="Teléfono" helpText="Formato: +57 300 123 4567">
        <Input type="tel" placeholder="+57" />
      </FormField>
      <FormField label="Descripción">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows={4}
          placeholder="Cuéntanos más..."
        />
      </FormField>
    </div>
  ),
};

