import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FileUpload from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Images: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ width: '600px' }}>
        <FileUpload
          accept="image/*"
          multiple
          value={files}
          onChange={setFiles}
          preview
        />
        <p className="text-sm text-gray-600 mt-2">
          {files.length} archivo(s) seleccionado(s)
        </p>
      </div>
    );
  },
};

export const SingleFile: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ width: '600px' }}>
        <FileUpload
          accept="image/*"
          multiple={false}
          value={files}
          onChange={setFiles}
          preview
        />
      </div>
    );
  },
};

export const Documents: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ width: '600px' }}>
        <FileUpload
          accept=".pdf,.doc,.docx"
          multiple
          value={files}
          onChange={setFiles}
          preview
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ width: '600px' }}>
        <FileUpload
          accept="image/*"
          value={files}
          onChange={setFiles}
          disabled
        />
      </div>
    );
  },
};

export const WithoutPreview: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ width: '600px' }}>
        <FileUpload
          accept="image/*"
          multiple
          value={files}
          onChange={setFiles}
          preview={false}
        />
        <ul className="mt-4 space-y-1">
          {files.map((file, i) => (
            <li key={i} className="text-sm text-gray-700">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
      </div>
    );
  },
};

