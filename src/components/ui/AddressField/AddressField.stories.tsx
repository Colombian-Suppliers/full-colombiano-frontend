// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import AddressField from './AddressField';

const meta = {
  title: 'Ui/AddressField',
  component: AddressField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddressField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to provide form context
const AddressFieldWrapper = (args) => {
  const { register } = useForm();
  return <AddressField {...args} register={register} />;
};

export const Default: Story = {
  render: (args) => <AddressFieldWrapper {...args} />,
  args: {
    label: 'Dirección',
    required: false,
  },
};

export const Required: Story = {
  render: (args) => <AddressFieldWrapper {...args} />,
  args: {
    label: 'Dirección',
    required: true,
  },
};
