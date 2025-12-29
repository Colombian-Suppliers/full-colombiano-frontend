// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import Step1PersonalInfo from './Step1PersonalInfo';

const meta = {
  title: 'Auth/Buyer/Step1PersonalInfo',
  component: Step1PersonalInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step1PersonalInfo>;

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
