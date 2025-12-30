// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Step1PersonType from './Step1PersonType';

const meta = {
  title: 'Auth/Seller/Step1PersonType',
  component: Step1PersonType,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step1PersonType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => (field === 'vendorType' ? '' : ''),
    next: () => console.log('Next step'),
    prev: () => console.log('Previous step'),
    setValue: (field, value) => console.log('Set value:', field, value),
  },
};

export const NaturalSelected: Story = {
  args: {
    register: () => ({}),
    watch: (field) => (field === 'vendorType' ? 'natural' : ''),
    next: () => console.log('Next step'),
    prev: () => console.log('Previous step'),
    setValue: (field, value) => console.log('Set value:', field, value),
  },
};

export const JuridicaSelected: Story = {
  args: {
    register: () => ({}),
    watch: (field) => (field === 'vendorType' ? 'juridica' : ''),
    next: () => console.log('Next step'),
    prev: () => console.log('Previous step'),
    setValue: (field, value) => console.log('Set value:', field, value),
  },
};
