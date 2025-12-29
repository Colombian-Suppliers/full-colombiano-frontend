// @ts-nocheck
import React from 'react';// @jsxImportSource react
import { MdLocationOn, MdPhone, MdEmail, MdEdit, MdStar } from 'react-icons/md';
import { copyToClipboard } from "@/utils/helpers";
import { showSuccessToast, showErrorToast } from "@/utils/toastUtils";

const SocialIcons = () => (
  <div className="flex items-center gap-2">
    <button aria-label="Facebook" className="text-gray-500 hover:text-gray-700">
      f
    </button>
    <button
      aria-label="Instagram"
      className="text-gray-500 hover:text-gray-700"
    >
      ig
    </button>
    <button aria-label="Whatsapp" className="text-gray-500 hover:text-gray-700">
      wa
    </button>
    <button aria-label="Linkedin" className="text-gray-500 hover:text-gray-700">
      in
    </button>
  </div>
);

const Rating = ({ rating, count }) => (
  <div className="flex items-center gap-1 text-sm">
    <MdStar className="text-yellow-400" />
    <span className="font-medium">{rating}</span>
    <span className="text-gray-500">de {count} reseñas</span>
  </div>
);

const StoreHero = ({ store = {}, onEdit }) => {
  const handleCopyUrl = async () => {
    const ok = await copyToClipboard(store.frontend_url || '');
    if (ok) showSuccessToast('URL copiada al portapapeles');
    else showErrorToast('No se pudo copiar la URL');
  };

  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden relative">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center text-primary-600 text-xl">
            Tienda
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {store?.name || 'Nombre de la Tienda'}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <MdLocationOn />
                    {store?.address?.city || 'Ciudad'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdPhone />
                    {store?.phone || 'Teléfono tienda'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdEmail />
                    {store?.email || 'Correo@tienda.com'}
                  </span>
                  {store?.issues_electronic_invoice && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                      Facturación electrónica
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <Rating
                    rating={store?.stats?.averageRating || 0}
                    count={store?.stats?.totalReviews || 0}
                  />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <SocialIcons />
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={handleCopyUrl}
                  className="text-sm text-primary-600 underline mr-2"
                >
                  {store.frontend_url || 'https://...'}
                </button>
                <button
                  onClick={() => onEdit?.()}
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-3 py-1 rounded hover:shadow"
                >
                  {' '}
                  <MdEdit /> Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHero;
