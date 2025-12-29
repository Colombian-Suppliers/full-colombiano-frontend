// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Step2StoreInfo from './Step2StoreInfo';

const meta = {
  title: 'Auth/Seller/Step2StoreInfo',
  component: Step2StoreInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step2StoreInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => '',
    errors: {},
    setValue: (field, value) => console.log('Set value:', field, value),
    departments: ['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca'],
    storeCities: ['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta'],
    loadingGeo: false,
    storeDept: '',
    back: () => console.log('Back'),
    next: () => console.log('Next'),
  },
};

export const WithDepartmentSelected: Story = {
  args: {
    register: () => ({}),
    watch: (field) => (field === 'storeDept' ? 'Antioquia' : ''),
    errors: {},
    setValue: (field, value) => console.log('Set value:', field, value),
    departments: ['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca'],
    storeCities: ['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta'],
    loadingGeo: false,
    storeDept: 'Antioquia',
    back: () => console.log('Back'),
    next: () => console.log('Next'),
  },
};
