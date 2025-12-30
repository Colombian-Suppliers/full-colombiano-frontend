// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Step3Representative from './Step3Representative';

const meta = {
  title: 'Auth/Seller/Juridica/Step3Representative',
  component: Step3Representative,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step3Representative>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => "",
    errors: {},
    next: () => console.log("Next"),
    prev: () => console.log("Previous"),
  },
};
