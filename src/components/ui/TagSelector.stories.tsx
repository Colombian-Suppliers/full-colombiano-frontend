// @ts-nocheck
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import TagSelector from './TagSelector';

const meta = {
  title: 'Ui/TagSelector',
  component: TagSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTags = [
  { id: 1, name: 'Artesanía' },
  { id: 2, name: 'Hecho a mano' },
  { id: 3, name: 'Cerámica' },
  { id: 4, name: 'Textil' },
  { id: 5, name: 'Decoración' },
  { id: 6, name: 'Regalo' },
  { id: 7, name: 'Tradicional' },
  { id: 8, name: 'Moderno' },
  { id: 9, name: 'Ecológico' },
  { id: 10, name: 'Sostenible' },
];

// Wrapper to handle state
const TagSelectorWrapper = (args) => {
  const [value, setValue] = useState('');
  return <TagSelector {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <TagSelectorWrapper {...args} />,
  args: {
    availableTags: mockTags,
    loading: false,
    placeholder: 'Selecciona etiquetas',
    disabled: false,
  },
};

export const WithSelectedTags: Story = {
  render: (args) => {
    const [value, setValue] = useState('Artesanía, Hecho a mano, Cerámica');
    return <TagSelector {...args} value={value} onChange={setValue} />;
  },
  args: {
    availableTags: mockTags,
    loading: false,
    placeholder: 'Selecciona etiquetas',
    disabled: false,
  },
};

export const Loading: Story = {
  render: (args) => <TagSelectorWrapper {...args} />,
  args: {
    availableTags: [],
    loading: true,
    placeholder: 'Selecciona etiquetas',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => <TagSelectorWrapper {...args} />,
  args: {
    availableTags: mockTags,
    loading: false,
    placeholder: 'Selecciona etiquetas',
    disabled: true,
  },
};
