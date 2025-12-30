// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Step4Credentials from './Step4Credentials';

const meta = {
  title: 'Auth/Seller/Juridica/Step4Credentials',
  component: Step4Credentials,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step4Credentials>;

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
