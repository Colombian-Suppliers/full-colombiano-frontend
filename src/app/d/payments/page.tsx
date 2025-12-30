'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { MdFilterList, MdDownload, MdInfo } from 'react-icons/md';
import toast from 'react-hot-toast';

interface Balance {
  available: number;
  pending: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

/**
 * Payments Page
 * Complete payment management with balance, transactions, and withdrawals
 */
export default function PaymentsPage() {
  const [balance, setBalance] = useState<Balance>({ available: 0, pending: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Load from API
      // const [balanceData, transactionsData] = await Promise.all([
      //   paymentApiService.getBalance(),
      //   paymentApiService.getTransactions({ limit: 20 }),
      // ]);
      // setBalance(balanceData);
      // setTransactions(transactionsData.transactions || []);
      setBalance({ available: 2500000, pending: 500000 });
      setTransactions([]);
    } catch (error) {
      console.error('Error loading payments data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) return;

    try {
      setSubmitting(true);
      // TODO: await paymentApiService.withdrawFunds({ amount: parseFloat(withdrawalAmount), bankAccountId: 'default' });
      toast.success('Retiro solicitado exitosamente');
      setWithdrawalModal(false);
      setWithdrawalAmount('');
      loadData();
    } catch (error) {
      toast.error('Error al solicitar retiro');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      completed: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Completado',
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Pendiente',
      },
      failed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Fallido' },
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
          <p className="text-[#0d141b] text-4xl font-black leading-tight tracking-[-0.033em]">
            Pagos
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Withdrawal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-200">
                <p className="text-gray-600 text-base font-medium leading-normal">
                  Saldo Disponible
                </p>
                <p className="text-gray-900 tracking-tight text-4xl font-bold leading-tight">
                  ${balance.available?.toLocaleString('es-CO') || '0'}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 text-base font-medium leading-normal">
                    Confirmación Pendiente
                  </p>
                  <MdInfo
                    className="text-gray-400 text-base cursor-pointer"
                    title="Fondos de ventas recientes, se liquidan en 3-5 días hábiles."
                  />
                </div>
                <p className="text-gray-900 tracking-tight text-4xl font-bold leading-tight">
                  ${balance.pending?.toLocaleString('es-CO') || '0'}
                </p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  Historial de Transacciones
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MdFilterList />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MdDownload />
                    Exportar
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="p-3 text-sm font-semibold text-gray-500">
                        Fecha
                      </th>
                      <th className="p-3 text-sm font-semibold text-gray-500">
                        Descripción
                      </th>
                      <th className="p-3 text-sm font-semibold text-gray-500 text-right">
                        Monto
                      </th>
                      <th className="p-3 text-sm font-semibold text-gray-500 text-center">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-8 text-gray-500"
                        >
                          No hay transacciones aún.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-200"
                        >
                          <td className="p-3 text-sm text-gray-800">
                            {new Date(transaction.date).toLocaleDateString(
                              'es-ES'
                            )}
                          </td>
                          <td className="p-3 text-sm text-gray-800">
                            {transaction.description}
                          </td>
                          <td
                            className={`p-3 text-sm text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}
                          >
                            {transaction.amount < 0 ? '-' : '+'}$
                            {Math.abs(transaction.amount).toLocaleString('es-CO')}
                          </td>
                          <td className="p-3 text-center">
                            {getStatusBadge(transaction.status)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Withdrawal Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Retirar Fondos
              </h2>

              {/* Progress Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-gray-600 text-sm font-medium leading-normal">
                    Monto Mínimo de Retiro
                  </p>
                  <p className="text-gray-900 text-sm font-bold leading-normal">
                    $1,000,000
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${Math.min((balance.available / 1000000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-gray-500 text-xs font-normal leading-normal text-right">
                  ${(1000000 - balance.available).toLocaleString('es-CO')} para completar
                </p>
              </div>

              {/* Withdrawal Amount Input */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-gray-800 text-sm font-medium leading-normal"
                  htmlFor="withdrawal-amount"
                >
                  Monto de Retiro
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <Input
                    id="withdrawal-amount"
                    type="number"
                    placeholder="0"
                    className="pl-7"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Bank Account */}
              <div className="flex flex-col gap-3">
                <label className="text-gray-800 text-sm font-medium leading-normal">
                  Retirar a
                </label>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Banco de Prueba
                      </p>
                      <p className="text-sm text-gray-500">
                        **** **** **** 1234
                      </p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">
                    Cambiar
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full"
                disabled={
                  balance.available < 1000000 ||
                  parseFloat(withdrawalAmount) > balance.available
                }
                onClick={() => setWithdrawalModal(true)}
              >
                Retirar Fondos
              </Button>

              {balance.available < 1000000 && (
                <p className="text-xs text-gray-500 text-center">
                  Necesitas al menos $1,000,000 para hacer un retiro
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {withdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmar Retiro</h3>
            <div className="space-y-4">
              <p>
                ¿Estás seguro de que quieres retirar $
                {parseFloat(withdrawalAmount || '0').toLocaleString('es-CO')}?
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  El retiro se procesará en 3-5 días hábiles.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setWithdrawalModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleWithdraw} disabled={submitting}>
                  {submitting ? 'Procesando...' : 'Confirmar Retiro'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
