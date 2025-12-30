// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PersonalInfoCard from './PersonalInfoCard';

const meta = {
  title: 'Store/PersonalInfoCard',
  component: PersonalInfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
