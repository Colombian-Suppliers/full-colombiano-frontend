// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Step2CompanyInfo from './Step2CompanyInfo';

const meta = {
  title: 'Auth/Seller/Juridica/Step2CompanyInfo',
  component: Step2CompanyInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step2CompanyInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => '',
    setValue: (field, value) => console.log('Set value:', field, value),
    errors: {},
    departments: ['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca'],
    companyCities: ['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta'],
    loadingGeo: false,
    companyDept: '',
    next: () => console.log('Next'),
    prev: () => console.log('Previous'),
  },
};
