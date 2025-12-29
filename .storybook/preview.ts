import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';

// Polyfill for Next.js in Storybook
if (typeof global.process === 'undefined') {
  (global as any).process = { env: {}, browser: true };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff',
        },

        dark: {
          name: 'dark',
          value: '#1a1a1a',
        },

        "background-light": {
          name: 'background-light',
          value: '#f6f7f8',
        }
      }
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

// Mock Next.js Image component for Storybook
if (typeof window !== 'undefined') {
  // Override the Next.js Image loader to use regular img tags in Storybook
  (window as any).__NEXT_IMAGE_IMPORTED = true;
  (window as any).__NEXT_IMAGE_OPTS = {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/',
    loader: 'default',
  };
}

export default preview;

