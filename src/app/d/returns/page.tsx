'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import { MdMoreHoriz } from 'react-icons/md';
import toast from 'react-hot-toast';

interface ReturnItem {
  id: string;
  orderId: string;
  customerName: string;
  productName: string;
  reason: string;
  status: 'approved' | 'pending' | 'received' | 'completed' | 'rejected';
  submittedDate: string;
}

/**
 * Returns Page
 * Complete return management with approval, rejection, and tracking
 */
export default function ReturnsPage() {
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReturn, setSelectedReturn] = useState<ReturnItem | null>(null);
  const [actionModal, setActionModal] = useState(false);
  const [issueCredit, setIssueCredit] = useState(false);

  useEffect(() => {
    loadReturns();
  }, []);

  const loadReturns = async () => {
    try {
      setLoading(true);
      // TODO: const data = await returnApiService.getReturns();
      // setReturns(data.returns || []);
      setReturns([]);
    } catch (error) {
      console.error('Error loading returns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (returnItem: ReturnItem) => {
    setSelectedReturn(returnItem);
    setActionModal(true);
  };

  const handleApprove = async () => {
    if (!selectedReturn) return;
    try {
      // TODO: await returnApiService.approveReturn(selectedReturn.id);
      toast.success('Devolución aprobada');
      setActionModal(false);
      loadReturns();
    } catch (error) {
      toast.error('Error al aprobar devolución');
    }
  };

  const handleReject = async (reason: string) => {
    if (!selectedReturn) return;
    try {
      // TODO: await returnApiService.rejectReturn(selectedReturn.id, reason);
      toast.success('Devolución rechazada');
      setActionModal(false);
      loadReturns();
    } catch (error) {
      toast.error('Error al rechazar devolución');
    }
  };

  const handleMarkReceived = async () => {
    if (!selectedReturn) return;
    try {
      // TODO: await returnApiService.markAsReceived(selectedReturn.id, issueCredit);
      toast.success('Devolución marcada como recibida');
      setActionModal(false);
      loadReturns();
    } catch (error) {
      toast.error('Error al marcar como recibida');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      approved: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Aprobada',
      },
      pending: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'Pendiente de Aprobación',
      },
      received: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Recibida' },
      completed: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: 'Completada',
      },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazada' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p className="text-[#0d141b] text-4xl font-black leading-tight tracking-[-0.033em]">
              Gestionar Devoluciones
            </p>
            <Button>Crear Nueva Solicitud de Devolución</Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline">Estado</Button>
            <Button variant="outline">Rango de Fechas</Button>
            <Button variant="outline">Razón de Devolución</Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ID Devolución
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ID Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Nombre Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Nombre Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Razón
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha Envío
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {returns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-500">
                    No hay devoluciones.
                  </td>
                </tr>
              ) : (
                returns.map((returnItem) => (
                  <tr key={returnItem.id}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      #{returnItem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      #{returnItem.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {returnItem.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {returnItem.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {returnItem.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(returnItem.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(returnItem.submittedDate).toLocaleDateString(
                        'es-ES'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="p-1 rounded-full hover:bg-gray-200"
                        onClick={() => handleAction(returnItem)}
                      >
                        <MdMoreHoriz className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {actionModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Acciones de Devolución</h3>
            <div className="space-y-4">
              <p>
                <strong>ID Devolución:</strong> #{selectedReturn.id}
              </p>
              <p>
                <strong>Cliente:</strong> {selectedReturn.customerName}
              </p>
              <p>
                <strong>Producto:</strong> {selectedReturn.productName}
              </p>
              <p>
                <strong>Razón:</strong> {selectedReturn.reason}
              </p>

              <div className="flex gap-3 flex-wrap">
                {selectedReturn.status === 'pending' && (
                  <>
                    <Button onClick={handleApprove}>Aprobar</Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReject('No cumple criterios')}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
                {selectedReturn.status === 'approved' && (
                  <Button onClick={() => setIssueCredit(true)}>
                    Marcar como Recibida
                  </Button>
                )}
              </div>

              {selectedReturn.status === 'approved' && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="issue-credit"
                      checked={issueCredit}
                      onChange={(e) => setIssueCredit(e.target.checked)}
                      className="mr-3"
                    />
                    <label htmlFor="issue-credit" className="font-medium text-sm">
                      Emitir crédito inmediato a la plataforma
                    </label>
                  </div>
                </div>
              )}

              {issueCredit && (
                <Button onClick={handleMarkReceived} className="w-full">
                  Confirmar Recepción {issueCredit ? '& Emitir Crédito' : ''}
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => {
                  setActionModal(false);
                  setIssueCredit(false);
                }}
                className="w-full"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
