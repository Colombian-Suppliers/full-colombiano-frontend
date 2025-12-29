// @ts-nocheck
import React from 'react';import { Button } from "@/components/ui/Button";
import { MdStar, MdFlag } from 'react-icons/md';

/**
 * ReviewCard Component
 * Principio: Single Responsibility - renderiza una reseña individual
 * Principio: Interface Segregation - props específicos para datos de reseña
 */
const ReviewCard = ({ review, onRespond, onReport }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <MdStar
            key={i}
            className={`${
              i < fullStars
                ? 'fill-current text-yellow-500'
                : i === fullStars && hasHalfStar
                  ? 'fill-current text-yellow-500 opacity-50'
                  : 'text-gray-300'
            }`}
            size={16}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-start gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{ backgroundImage: `url(${review.avatar})` }}
        ></div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-[#0d141b]">{review.author}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            {renderStars(review.rating)}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div
              className="w-12 h-12 bg-gray-200 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${review.productImage})` }}
            ></div>
            <p className="font-semibold text-sm text-gray-800">
              {review.productName}
            </p>
          </div>
          <p className="mt-3 text-gray-700">{review.comment}</p>
          {review.response && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="font-bold text-sm text-primary">Tu Respuesta</p>
              <p className="mt-1 text-sm text-gray-600">{review.response}</p>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onRespond(review.id)}
            >
              Responder
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-100 flex items-center gap-1"
              onClick={() => onReport(review.id)}
            >
              <MdFlag className="text-base" />
              Reportar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
