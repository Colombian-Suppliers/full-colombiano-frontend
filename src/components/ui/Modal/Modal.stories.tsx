// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Modal from './Modal';

const meta = {
  title: 'Ui/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
