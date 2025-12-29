// @ts-nocheck
import React from 'react';import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdNotifications,
} from 'react-icons/md';
import { Button } from "@/components/ui/Button";
import { formatDateColombian } from "@/utils/dateUtils";
import { extractBodyContent } from "@/utils/htmlUtils";

/**
 * Componente para el header del detalle del anuncio
 * Principio: Single Responsibility - solo renderiza el header del detalle
 */
const AnnouncementDetailHeader = ({
  announcement,
  onMarkAsRead,
  onMarkAsUnread,
  markingAsRead,
}) => {
  return (
    <div className="border-b border-gray-200 pb-4 mb-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-xl font-bold text-gray-900">
          {announcement.subject || announcement.title}
        </h2>
        <div className="flex items-center gap-2">
          {announcement.is_read ? (
            <MdCheckCircle className="text-green-500 text-xl flex-shrink-0" />
          ) : (
            <MdRadioButtonUnchecked className="text-orange-500 text-xl flex-shrink-0" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>
            {formatDateColombian(
              announcement.date || announcement.created_date
            )}
          </span>
          {announcement.category && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
              {announcement.category}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {!announcement.is_read ? (
            <Button
              size="sm"
              onClick={() => onMarkAsRead(announcement.id)}
              disabled={markingAsRead.has(announcement.id)}
              className="bg-primary hover:bg-primary-600 text-white"
            >
              {markingAsRead.has(announcement.id)
                ? 'Marcando...'
                : 'Marcar como leído'}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => onMarkAsUnread(announcement.id)}
              disabled={markingAsRead.has(announcement.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {markingAsRead.has(announcement.id)
                ? 'Marcando...'
                : 'Marcar como no leído'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Componente para el contenido del anuncio
 * Principio: Single Responsibility - solo renderiza el contenido HTML
 */
const AnnouncementContent = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <div
        className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 leading-relaxed announcement-content"
        dangerouslySetInnerHTML={{
          __html: extractBodyContent(content || ''),
        }}
      />
      <style>{`
        .announcement-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 16px 0;
          display: block;
        }
        .announcement-content p {
          margin: 12px 0;
          line-height: 1.6;
        }
        .announcement-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .announcement-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .announcement-content ul,
        .announcement-content ol {
          margin: 12px 0;
          padding-left: 24px;
        }
        .announcement-content li {
          margin: 8px 0;
        }
        .announcement-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
        }
        .announcement-content td {
          padding: 8px;
          vertical-align: top;
        }
        .announcement-content table[width="600"] {
          max-width: 100%;
          width: 100% !important;
        }
      `}</style>
    </div>
  );
};

/**
 * Componente para el estado vacío del detalle
 * Principio: Single Responsibility - solo maneja el placeholder vacío
 */
const AnnouncementDetailEmpty = () => {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center">
        <div className="bg-gray-100 rounded-full p-6 mb-4 mx-auto w-fit">
          <MdNotifications className="text-6xl text-gray-300" />
        </div>
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          Selecciona un anuncio
        </h3>
        <p className="text-gray-500">
          Haz clic en un anuncio de la lista para ver su contenido completo
        </p>
      </div>
    </div>
  );
};

/**
 * Componente principal para el detalle del anuncio
 * Principio: Single Responsibility - solo renderiza el panel de detalle
 */
const AnnouncementsDetail = ({
  selectedAnnouncement,
  markingAsRead,
  onMarkAsRead,
  onMarkAsUnread,
}) => {
  return (
    <div
      data-testid="announcements-detail-panel"
      className="hidden md:block flex-1 h-full bg-white overflow-y-auto pl-6"
    >
      {selectedAnnouncement ? (
        <div className="p-12">
          {/* Header */}
          <AnnouncementDetailHeader
            announcement={selectedAnnouncement}
            onMarkAsRead={onMarkAsRead}
            onMarkAsUnread={onMarkAsUnread}
            markingAsRead={markingAsRead}
          />

          {/* Content */}
          <AnnouncementContent content={selectedAnnouncement.content} />
        </div>
      ) : (
        <AnnouncementDetailEmpty />
      )}
    </div>
  );
};

export default AnnouncementsDetail;
