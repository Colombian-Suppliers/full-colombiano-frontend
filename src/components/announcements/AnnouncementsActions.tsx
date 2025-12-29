// @ts-nocheck
import React from 'react';import { Button } from "@/components/ui/Button";

/**
 * Componente para la barra de acciones cuando hay elementos seleccionados
 * Principio: Single Responsibility - solo maneja las acciones masivas
 */
const AnnouncementsActions = ({
  selectedCount,
  onMarkSelectedAsRead,
  onMarkSelectedAsUnread,
  onCancelSelection,
  markingAsRead,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="border-b border-gray-200 bg-yellow-50 px-12 py-3 flex-shrink-0">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-sm font-medium text-gray-700">
          {selectedCount}{' '}
          {selectedCount === 1 ? 'seleccionado' : 'seleccionados'}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onMarkSelectedAsUnread}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Marcar como No leído
          </Button>
          <Button
            size="sm"
            onClick={onMarkSelectedAsRead}
            disabled={markingAsRead.has('batch')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {markingAsRead.has('batch') ? 'Marcando...' : 'Marcar como Leído'}
          </Button>
          <Button
            size="sm"
            onClick={onCancelSelection}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsActions;
