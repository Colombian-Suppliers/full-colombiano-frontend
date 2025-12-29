// @ts-nocheck
import React from 'react';import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { MdInventory } from 'react-icons/md';

const EmptyProducts = ({ onAddProduct }) => {
  return (
    <div className="col-span-full bg-white rounded-xl border border-gray-200 flex items-center justify-center p-12">
      <div className="max-w-2xl text-center">
        <div className="w-28 h-28 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
          <MdInventory className="text-primary-600 text-5xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Publica tu primer producto
        </h2>
        <p className="text-gray-500 mb-6">
          Y llévemoslo juntos a todos los rincones de Colombia
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={onAddProduct}>+ Añadir producto</Button>
          <Link to="/d/products/add-product" className="hidden">
            Full editor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyProducts;
