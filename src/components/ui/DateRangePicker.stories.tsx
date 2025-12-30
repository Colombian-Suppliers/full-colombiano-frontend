// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DateRangePicker from './DateRangePicker';

const meta = {
  title: 'Ui/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
