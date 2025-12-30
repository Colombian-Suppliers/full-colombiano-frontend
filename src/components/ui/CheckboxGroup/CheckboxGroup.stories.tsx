// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import CheckboxGroup from './CheckboxGroup';

const meta = {
  title: 'Ui/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  {
    name: 'terms',
    title: 'Acepto los términos y condiciones',
    description: 'He leído y acepto los términos del servicio',
  },
  {
    name: 'newsletter',
    title: 'Recibir boletín informativo',
    description: 'Quiero recibir noticias y ofertas por correo',
  },
  {
    name: 'notifications',
    title: 'Notificaciones push',
    description: 'Permitir notificaciones del navegador',
  },
];

// Wrapper component to provide form context
const CheckboxGroupWrapper = (args) => {
  const { register } = useForm();
  return <CheckboxGroup {...args} register={register} />;
};

export const Default: Story = {
  render: (args) => <CheckboxGroupWrapper {...args} />,
  args: {
    label: 'Preferencias',
    options: mockOptions,
    required: false,
  },
};

export const Required: Story = {
  render: (args) => <CheckboxGroupWrapper {...args} />,
  args: {
    label: 'Configuración requerida',
    options: mockOptions,
    required: true,
  },
};
