// @ts-nocheck
import React from 'react';import {
  MdAnnouncement,
  MdNotificationsActive,
  MdMarkEmailRead,
} from 'react-icons/md';

/**
 * Componente para el header de la página de anuncios con estadísticas
 * Principio: Single Responsibility - solo renderiza el header con stats
 */
const AnnouncementsHeader = ({ stats }) => {
  return (
    <div className="border-b border-gray-200 bg-white flex-shrink-0">
      <div className="px-12 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title Section */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Centro de Anuncios
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Mantente informado sobre las últimas novedades y actualizaciones
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 min-w-fit">
              <MdAnnouncement className="text-primary text-xl" />
              <div>
                <p className="text-xs text-gray-600">Total de Anuncios</p>
                <p className="text-xl font-bold text-primary">
                  {stats.totalAnnouncements}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 min-w-fit">
              <MdNotificationsActive className="text-orange-600 text-xl" />
              <div>
                <p className="text-xs text-gray-600">Anuncios Sin Leer</p>
                <p className="text-xl font-bold text-orange-600">
                  {stats.unreadCount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 min-w-fit">
              <MdMarkEmailRead className="text-green-600 text-xl" />
              <div>
                <p className="text-xs text-gray-600">Anuncios Leídos</p>
                <p className="text-xl font-bold text-green-600">
                  {stats.totalAnnouncements - stats.unreadCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsHeader;
