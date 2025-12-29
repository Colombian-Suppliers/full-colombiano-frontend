// @ts-nocheck
import React from 'react';import { MdNotifications } from 'react-icons/md';
import { formatRelativeDateColombian } from "@/utils/dateUtils";
import { getPlainTextPreview } from "@/utils/htmlUtils";

/**
 * Componente para el header de selección de la lista
 * Principio: Single Responsibility - solo maneja la selección masiva
 */
const AnnouncementsListHeader = ({
  filteredAnnouncements,
  selectedAnnouncements,
  onSelectAll,
}) => {
  const allSelected =
    filteredAnnouncements.length > 0 &&
    selectedAnnouncements.size === filteredAnnouncements.length;

  const someSelected = selectedAnnouncements.size > 0 && !allSelected;

  return (
    <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-8 h-14 flex items-center gap-3 z-10">
      <input
        type="checkbox"
        checked={allSelected}
        ref={(el) => {
          if (el) el.indeterminate = someSelected;
        }}
        onChange={onSelectAll}
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
        aria-label="Seleccionar todos"
      />
      <span className="text-sm text-gray-600 font-medium">
        Seleccionar todos
      </span>
    </div>
  );
};

/**
 * Componente para un elemento individual de la lista de anuncios
 * Principio: Single Responsibility - solo renderiza un anuncio en la lista
 */
const AnnouncementListItem = ({
  announcement,
  isActive,
  onClick,
  onCheckboxChange,
  selectedAnnouncements,
}) => {
  return (
    <div
      onClick={onClick}
      className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
        isActive
          ? 'bg-green-50 border-l-4 border-l-green-500'
          : !announcement.is_read
            ? 'bg-white'
            : 'bg-gray-50/50'
      }`}
    >
      <div className="px-4  py-3 h-14">
        <div className="flex items-center gap-4 h-full">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={selectedAnnouncements.has(announcement.id)}
            onChange={(e) => {
              e.stopPropagation();
              onCheckboxChange(announcement.id);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer flex-shrink-0"
          />
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3
                className={`text-sm font-semibold truncate ${
                  !announcement.is_read ? 'text-gray-900' : 'text-gray-700'
                }`}
              >
                {announcement.subject || announcement.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!announcement.is_read && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatRelativeDateColombian(
                    announcement.date || announcement.created_date
                  )}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {getPlainTextPreview(announcement.content)}
            </p>
            {announcement.category && (
              <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {announcement.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente para el estado vacío de la lista
 * Principio: Single Responsibility - solo maneja el estado vacío
 */
const AnnouncementsEmptyState = ({ hasAnnouncements, _hasFilters }) => {
  return (
    <div className="p-8 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4 mx-auto w-fit">
        <MdNotifications className="text-4xl text-gray-400" />
      </div>
      <h3 className="font-bold text-base text-gray-900 mb-2">
        {hasAnnouncements
          ? 'No se encontraron anuncios'
          : 'No hay anuncios disponibles'}
      </h3>
      <p className="text-sm text-gray-500">
        {hasAnnouncements
          ? 'Prueba cambiando los filtros o la búsqueda.'
          : 'Los anuncios aparecerán aquí cuando haya nuevas actualizaciones.'}
      </p>
    </div>
  );
};

/**
 * Componente principal para la lista de anuncios
 * Principio: Single Responsibility - solo renderiza la lista de anuncios
 */
const AnnouncementsList = ({
  announcements,
  filteredAnnouncements,
  selectedAnnouncement,
  selectedAnnouncements,
  onAnnouncementClick,
  onSelectAll,
  onSelectAnnouncement,
  hideHeader = false,
}) => {
  const hasAnnouncements = announcements.length > 0;
  const hasFilteredResults = filteredAnnouncements.length > 0;

  return (
    <div
      data-testid="announcements-list-panel"
      className="w-full md:w-3/10 bg-white overflow-y-auto flex-shrink-0 h-full flex flex-col"
    >
      {/* Select All Header (can be hidden when using global header) */}
      {!hideHeader && (
        <AnnouncementsListHeader
          filteredAnnouncements={filteredAnnouncements}
          selectedAnnouncements={selectedAnnouncements}
          onSelectAll={onSelectAll}
        />
      )}

      {/* Announcement List Items */}
      {!hasFilteredResults ? (
        <AnnouncementsEmptyState
          hasAnnouncements={hasAnnouncements}
          hasFilters={!hasFilteredResults && hasAnnouncements}
        />
      ) : (
        filteredAnnouncements.map((announcement) => (
          <AnnouncementListItem
            key={announcement.id}
            announcement={announcement}
            isActive={selectedAnnouncement?.id === announcement.id}
            onClick={() => onAnnouncementClick(announcement)}
            onCheckboxChange={onSelectAnnouncement}
            selectedAnnouncements={selectedAnnouncements}
          />
        ))
      )}
    </div>
  );
};

export default AnnouncementsList;
