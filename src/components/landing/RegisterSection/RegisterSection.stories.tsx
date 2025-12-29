// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import RegisterSection from './RegisterSection';

const meta = {
  title: 'Landing/RegisterSection',
  component: RegisterSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegisterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
