// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Step3Credentials from './Step3Credentials';

const meta = {
  title: 'Auth/Seller/Natural/Step3Credentials',
  component: Step3Credentials,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step3Credentials>;

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
