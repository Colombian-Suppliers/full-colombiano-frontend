// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
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

export const Default: Story = {
  args: {},
  parameters: {
    chromatic: { disable: true },
  },
};
