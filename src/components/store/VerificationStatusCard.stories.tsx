// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import VerificationStatusCard from './VerificationStatusCard';

const meta = {
  title: 'Store/VerificationStatusCard',
  component: VerificationStatusCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VerificationStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
