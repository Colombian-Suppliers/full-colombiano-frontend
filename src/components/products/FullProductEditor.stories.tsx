// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FullProductEditor from './FullProductEditor';

const meta = {
  title: 'Products/FullProductEditor',
  component: FullProductEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FullProductEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
