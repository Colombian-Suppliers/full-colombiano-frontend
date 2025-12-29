// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import CategorySelectorModal from './CategorySelectorModal';

const meta = {
  title: 'Ui/CategorySelectorModal',
  component: CategorySelectorModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategorySelectorModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
