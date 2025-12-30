// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CompanyInfoCard from './CompanyInfoCard';

const meta = {
  title: 'Store/CompanyInfoCard',
  component: CompanyInfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CompanyInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
