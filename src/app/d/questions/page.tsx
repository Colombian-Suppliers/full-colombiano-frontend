'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { MdSearch, MdReply, MdReport } from 'react-icons/md';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  productName: string;
  productImage: string;
  question: string;
  date: string;
  status: 'unanswered' | 'answered';
  answer?: string;
}

/**
 * Questions Page
 * Complete question management with search, filters, and reply functionality
 */
export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unanswered' | 'answered'>('all');
  const [replyModal, setReplyModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Load from API
      // const params: Record<string, string> = {};
      // if (searchTerm) params.search = searchTerm;
      // if (activeFilter !== 'all') params.status = activeFilter;
      // const data = await questionApiService.getQuestions(params);
      // setQuestions(data.questions || []);
      setQuestions([]);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchTerm]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleReply = (question: Question) => {
    setSelectedQuestion(question);
    setReplyText(question.answer || '');
    setReplyModal(true);
  };

  const handleSubmitReply = async () => {
    if (!selectedQuestion || !replyText.trim()) return;

    try {
      setSubmitting(true);
      // TODO: await questionApiService.replyToQuestion(selectedQuestion.id, replyText.trim());
      toast.success('Respuesta enviada');
      setReplyModal(false);
      setSelectedQuestion(null);
      setReplyText('');
      loadQuestions();
    } catch (error) {
      toast.error('Error al enviar respuesta');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReport = async (questionId: string) => {
    try {
      // TODO: await questionApiService.reportQuestion(questionId, 'Contenido inapropiado');
      toast.success('Pregunta reportada exitosamente');
    } catch (error) {
      toast.error('Error al reportar pregunta');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      unanswered: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Sin Responder',
      },
      answered: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Respondida',
      },
    };

    const config = statusConfig[status] || statusConfig.unanswered;
    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}
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
            Preguntas y Respuestas
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white border border-gray-300">
                <div className="text-gray-500 flex border-none items-center justify-center pl-4">
                  <MdSearch />
                </div>
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 focus:outline-none focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2"
                  placeholder="Buscar preguntas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeFilter === 'all' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('all')}
              >
                Todas
              </Button>
              <Button
                variant={activeFilter === 'unanswered' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('unanswered')}
              >
                Sin Responder
              </Button>
              <Button
                variant={activeFilter === 'answered' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('answered')}
              >
                Respondidas
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Pregunta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {questions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No se encontraron preguntas.
                  </td>
                </tr>
              ) : (
                questions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              question.productImage ||
                              '/placeholder-product.png'
                            }
                            alt={question.productName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {question.productName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm truncate max-w-xs">
                      {question.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(question.date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(question.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReply(question)}
                          className="flex items-center gap-1"
                        >
                          <MdReply />
                          Responder
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReport(question.id)}
                          className="flex items-center gap-1"
                        >
                          <MdReport />
                          Reportar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {replyModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Responder Pregunta</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Producto:</strong> {selectedQuestion.productName}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Pregunta:</strong> {selectedQuestion.question}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu Respuesta
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Escribe tu respuesta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setReplyModal(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmitReply}
                  disabled={submitting || !replyText.trim()}
                >
                  {submitting ? 'Enviando...' : 'Enviar Respuesta'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
