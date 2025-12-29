// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import VariationEditor from './VariationEditor';

const meta = {
  title: 'Products/VariationEditor',
  component: VariationEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VariationEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
