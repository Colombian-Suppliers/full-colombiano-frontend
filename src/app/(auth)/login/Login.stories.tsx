// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

/**
 * Default login page state
 */
export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
        query: {},
      },
    },
  },
};

/**
 * Login page after successful email verification
 * Shows a success toast notification
 */
export const WithVerificationSuccess: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
        query: {
          verification: 'success',
        },
      },
    },
  },
};

/**
 * Login page after failed email verification (expired token)
 * Shows an error toast notification
 */
export const WithVerificationError: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
        query: {
          error: 'token_expired',
        },
      },
    },
  },
};

/**
 * Login page after email is already verified
 * Shows an info toast notification
 */
export const WithEmailAlreadyVerified: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
        query: {
          info: 'email_already_verified',
        },
      },
    },
  },
};

/**
 * Login page with invalid token error
 */
export const WithInvalidToken: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
        query: {
          error: 'token_invalid',
        },
      },
    },
  },
};

/**
 * Login page with missing token error
 */
export const WithMissingToken: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
        query: {
          error: 'token_missing',
        },
      },
    },
  },
};

