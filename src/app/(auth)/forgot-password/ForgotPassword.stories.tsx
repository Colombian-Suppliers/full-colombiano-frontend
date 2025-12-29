// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import ForgotPasswordPage from './page';

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPasswordPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmailSent: Story = {
  play: async ({ canvasElement }) => {
    // This story would show the "email sent" state
    // In a real scenario, you'd interact with the form and submit it
  },
};

