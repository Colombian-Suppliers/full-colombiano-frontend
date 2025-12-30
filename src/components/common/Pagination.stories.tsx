import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Common/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const WithoutPageNumbers: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        showPageNumbers={false}
      />
    );
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(15);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={30}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const InTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = 47;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="bg-white rounded-lg border p-6" style={{ width: '600px' }}>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}{' '}
            resultados
          </p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

