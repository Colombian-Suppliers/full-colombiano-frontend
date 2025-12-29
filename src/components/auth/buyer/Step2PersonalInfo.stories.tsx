// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Step2PersonalInfo from './Step2PersonalInfo';

const meta = {
  title: 'Auth/Buyer/Step2PersonalInfo',
  component: Step2PersonalInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step2PersonalInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    register: () => ({}),
    watch: (field) => "",
    errors: {},
    next: () => console.log("Next"),
    prev: () => console.log("Previous"),
  },
};
