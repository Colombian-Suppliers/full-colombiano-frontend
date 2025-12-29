// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginPage from './page';

const meta = {
  title: 'Auth/Login',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVerificationSuccess: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          verification: 'success',
        },
      },
    },
  },
};

export const WithVerificationError: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          error: 'token_expired',
        },
      },
    },
  },
};

