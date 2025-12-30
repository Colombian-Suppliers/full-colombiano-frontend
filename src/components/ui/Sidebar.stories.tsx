// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Sidebar from './Sidebar';

const meta = {
  title: 'Ui/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disable: true }, // Disabled: requires complex store mocks (useStore, useAuth, useNotificationsStore)
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Note: This component requires mocking:
// - useAuth() from @/lib/hooks/useAuth
// - useStore() global function
// - useNotificationsStore() global function
// These are not easily mockable in Storybook without proper context providers

export const Default: Story = {
  args: {
    collapsed: false,
    onToggle: () => console.log('Toggle'),
  },
  parameters: {
    chromatic: { disable: true },
  },
};
