import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { useState } from 'react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Filters/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <SearchBar value={value} onChange={setValue} />
        <p className="text-sm text-gray-600 mt-2">Valor: &quot;{value}&quot;</p>
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder="Buscar productos, vendedores..."
        />
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState('café colombiano');
    return (
      <div style={{ width: '400px' }}>
        <SearchBar value={value} onChange={setValue} />
      </div>
    );
  },
};

export const NoDebounce: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [results, setResults] = useState<string[]>([]);
    
    return (
      <div style={{ width: '400px' }}>
        <SearchBar
          value={value}
          onChange={(val) => {
            setValue(val);
            // Simulate instant search
            if (val) {
              setResults([`Resultado 1 para "${val}"`, `Resultado 2 para "${val}"`]);
            } else {
              setResults([]);
            }
          }}
          debounceMs={0}
        />
        {results.length > 0 && (
          <div className="mt-2 border border-gray-200 rounded-lg p-2">
            {results.map((result, i) => (
              <div key={i} className="text-sm text-gray-700 py-1">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

