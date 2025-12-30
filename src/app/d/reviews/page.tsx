'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Button from '@/components/ui/Button/Button';
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import toast from 'react-hot-toast';

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  avatar: string;
  productName: string;
  productImage: string;
  comment: string;
  response: string | null;
}

/**
 * Reviews Page
 * Complete review management with filters, sorting, and responses
 */
export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [paginatedReviews, setPaginatedReviews] = useState<Review[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unanswered'>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [submittingResponse, setSubmittingResponse] = useState(false);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const reviewsPerPage = 5;

  useEffect(() => {
    // TODO: Load from API
    setLoading(false);
    setAllReviews([]);
  }, []);

  const calculateRatingData = (reviews: Review[]) => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const totalReviews = reviews.length;
    const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round((sumRatings / totalReviews) * 10) / 10;

    const ratingBreakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      ratingBreakdown[review.rating] = (ratingBreakdown[review.rating] || 0) + 1;
    });

    // Convert to percentages
    Object.keys(ratingBreakdown).forEach((key) => {
      const numKey = parseInt(key);
      ratingBreakdown[numKey] = Math.round(
        (ratingBreakdown[numKey] / totalReviews) * 100
      );
    });

    return {
      averageRating,
      totalReviews,
      ratingBreakdown,
    };
  };

  const [ratingData, setRatingData] = useState(calculateRatingData([]));

  const applyFilters = useCallback(() => {
    let filtered = [...allReviews];

    if (activeFilter === 'unanswered') {
      filtered = filtered.filter((review) => !review.response);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'author-asc':
          return a.author.localeCompare(b.author);
        case 'author-desc':
          return b.author.localeCompare(a.author);
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
    setRatingData(calculateRatingData(filtered));
    setCurrentPage(1);
  }, [activeFilter, sortBy, allReviews]);

  const applyPagination = useCallback(() => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setPaginatedReviews(filteredReviews.slice(startIndex, endIndex));
  }, [filteredReviews, currentPage]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    applyPagination();
  }, [applyPagination]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleRespond = (reviewId: number) => {
    const review = allReviews.find((r) => r.id === reviewId);
    if (!review) return;
    setSelectedReview(review);
    setResponseText(review.response || '');
    setShowResponseModal(true);
  };

  const handleSubmitResponse = async () => {
    if (!selectedReview || !responseText.trim()) return;

    setSubmittingResponse(true);

    try {
      // TODO: await reviewApiService.respondToReview(selectedReview.id, responseText.trim());
      const updatedReviews = allReviews.map((review) =>
        review.id === selectedReview.id
          ? { ...review, response: responseText.trim() }
          : review
      );
      setAllReviews(updatedReviews);
      toast.success('Respuesta enviada');
      setShowResponseModal(false);
      setSelectedReview(null);
      setResponseText('');
    } catch (error) {
      toast.error('Error al enviar respuesta');
    } finally {
      setSubmittingResponse(false);
    }
  };

  const handleReport = (reviewId: number) => {
    toast.success(`Reseña ${reviewId} reportada. El equipo revisará el contenido.`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full overflow-auto">
      {/* Header with title and filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <p className="text-[#0d141b] text-4xl font-black leading-tight tracking-[-0.033em]">
                Gestionar Reseñas
              </p>
            </div>

            {/* Right Column - Filters */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex gap-3 items-center flex-wrap">
                <div className="flex gap-2">
                  <Button
                    variant={activeFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('all')}
                  >
                    Todas
                  </Button>
                  <Button
                    variant={activeFilter === 'unanswered' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter('unanswered')}
                  >
                    Sin Responder
                  </Button>
                </div>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguas</option>
                  <option value="author-asc">Autor (A-Z)</option>
                  <option value="author-desc">Autor (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Summary */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Resumen de Calificaciones</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold">{ratingData.averageRating}</div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MdStar
                      key={star}
                      className={`w-5 h-5 ${
                        star <= ratingData.averageRating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Basado en {ratingData.totalReviews} reseñas
                </div>
              </div>
              {Object.entries(ratingData.ratingBreakdown)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([rating, percentage]) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-8">{rating} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm w-12 text-right">{percentage}%</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Column: Reviews List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="space-y-4">
              {paginatedReviews.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="text-gray-500">
                    No se encontraron reseñas con los filtros aplicados.
                  </div>
                </div>
              ) : (
                paginatedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex gap-4">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <MdStar
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {review.productName}
                        </p>
                        <p className="mt-3">{review.comment}</p>
                        {review.response && (
                          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-semibold mb-1">Tu respuesta:</p>
                            <p className="text-sm">{review.response}</p>
                          </div>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRespond(review.id)}
                          >
                            {review.response ? 'Editar Respuesta' : 'Responder'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReport(review.id)}
                          >
                            Reportar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <MdChevronLeft />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <MdChevronRight />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Responder a Reseña</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{selectedReview.author}</strong> sobre{' '}
                <strong>{selectedReview.productName}</strong>
              </p>
              <p className="text-sm bg-gray-50 p-3 rounded">
                {selectedReview.comment}
              </p>
            </div>
            <textarea
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2"
              rows={4}
              placeholder="Escribe tu respuesta..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResponseModal(false);
                  setSelectedReview(null);
                  setResponseText('');
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitResponse}
                disabled={submittingResponse || !responseText.trim()}
              >
                {submittingResponse ? 'Enviando...' : 'Enviar Respuesta'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
