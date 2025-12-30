import { StarRating } from '@/components/common';
import { MdVerified } from 'react-icons/md';

export interface ReviewData {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified?: boolean;
  productName?: string;
  helpfulCount?: number;
}

interface ReviewCardProps {
  review: ReviewData;
  showProduct?: boolean;
  onReply?: (reviewId: string) => void;
  onMarkHelpful?: (reviewId: string) => void;
  className?: string;
}

/**
 * ReviewCard Component
 * Displays a single review with author info and rating
 * Fully testable review display component
 */
export default function ReviewCard({
  review,
  showProduct = false,
  onReply,
  onMarkHelpful,
  className = '',
}: ReviewCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {review.authorAvatar ? (
            <img
              src={review.authorAvatar}
              alt={review.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {review.authorName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Author Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {review.authorName}
              </span>
              {review.verified && (
                <MdVerified className="w-4 h-4 text-blue-600" title="Compra verificada" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Name (if shown) */}
      {showProduct && review.productName && (
        <p className="text-sm text-gray-600 mb-2">
          Producto: <span className="font-medium">{review.productName}</span>
        </p>
      )}

      {/* Comment */}
      <p className="text-gray-700 mb-4">{review.comment}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        {onMarkHelpful && (
          <button
            onClick={() => onMarkHelpful(review.id)}
            className="text-sm text-gray-600 hover:text-primary transition-colors"
          >
            👍 Útil {review.helpfulCount ? `(${review.helpfulCount})` : ''}
          </button>
        )}
        {onReply && (
          <button
            onClick={() => onReply(review.id)}
            className="text-sm text-primary hover:text-primary-600 font-medium transition-colors"
          >
            Responder
          </button>
        )}
      </div>
    </div>
  );
}

