// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Step2PersonalInfo from './Step2PersonalInfo';

const meta = {
  title: 'Auth/Seller/Natural/Step2PersonalInfo',
  component: Step2PersonalInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step2PersonalInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => "",
    setValue: (field, value) => console.log('Set value:', field, value),
    errors: {},
    departments: ['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca'],
    personalCities: ['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta'],
    loadingGeo: false,
    personalDept: '',
    next: () => console.log("Next"),
    prev: () => console.log("Previous"),
  },
};
