// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import ResetPasswordPage from './page';

const meta = {
  title: 'Auth/ResetPassword',
  component: ResetPasswordPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          token: 'mock-reset-token-123',
        },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValidToken: Story = {};

export const WithInvalidToken: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          token: null,
        },
      },
    },
  },
};

