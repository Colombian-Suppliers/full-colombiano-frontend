// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import AddAttributeModal from './AddAttributeModal';

const meta = {
  title: 'Products/AddAttributeModal',
  component: AddAttributeModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddAttributeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
