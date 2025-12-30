// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormField from './FormField';

const meta = {
  title: 'Ui/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
