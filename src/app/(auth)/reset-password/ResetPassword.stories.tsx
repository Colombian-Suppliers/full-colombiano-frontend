// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ResetPasswordPage from './page';

const meta = {
  title: 'Auth/ResetPassword',
  component: ResetPasswordPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValidToken: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/reset-password',
        query: {
          token: 'mock-reset-token-abc123xyz',
        },
      },
    },
  },
};

export const WithInvalidToken: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/reset-password',
        query: {},
      },
    },
  },
};

export const WithExpiredToken: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/reset-password',
        query: {},
      },
    },
  },
};

