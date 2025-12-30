// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import path, { dirname } from 'path';
import { mergeConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: ['../public'],

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          'next/navigation': path.resolve(__dirname, './nextNavigationMock.ts'),
          'next/image': path.resolve(__dirname, './nextImageMock.tsx'),
        },
      },
      define: {
        'process.env': {},
        'process.browser': true,
        global: 'globalThis',
      },
      assetsInclude: ['**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
      esbuild: {
        jsx: 'automatic',
      },
    });
  }
};

export default config;

