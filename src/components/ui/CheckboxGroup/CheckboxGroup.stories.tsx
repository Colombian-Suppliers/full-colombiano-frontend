// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import CheckboxGroup from './CheckboxGroup';

const meta = {
  title: 'Ui/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    chromatic: { disable: true },
  },
};
