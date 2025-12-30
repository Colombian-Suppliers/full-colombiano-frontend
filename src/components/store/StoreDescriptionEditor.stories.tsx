// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoreDescriptionEditor from './StoreDescriptionEditor';

const meta = {
  title: 'Store/StoreDescriptionEditor',
  component: StoreDescriptionEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreDescriptionEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
