'use client';
// @ts-nocheck
import React from 'react';

import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface CategoryItem {
  image: string;
  label: string;
}

const Category = ({ image, label }: CategoryItem) => (
  <div className="flex flex-col items-center gap-3 min-w-[100px]">
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border-4 border-white relative">
      <Image 
        src={image} 
        alt={label} 
        fill 
        sizes="(max-width: 768px) 80px, 96px"
        className="object-cover" 
      />
    </div>
    <span className="text-xs md:text-sm text-white font-medium">{label}</span>
  </div>
);

export interface CategoriesCarouselProps {
  categories?: CategoryItem[];
}

export const CategoriesCarousel = ({
  categories = [
    { image: '/images/cats/bisuteria.webp', label: 'Bisutería' },
    { image: '/images/cats/joyeria.webp', label: 'Joyería' },
    { image: '/images/cats/tejiduria.webp', label: 'Tejeduría' },
    { image: '/images/cats/telas.webp', label: 'Telas' },
    { image: '/images/cats/ceramica.webp', label: 'Cerámica' },
    { image: '/images/cats/alfareria.webp', label: 'Alfarería' },
  ],
}: CategoriesCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section
      className="py-12 lg:py-16 bg-cover bg-right bg-no-repeat relative"
      style={{ backgroundImage: `url('/images/landing/categories-bg.webp')` }}
    >
      <div className="absolute inset-0" />

      <div className="relative container mx-auto px-4">
        <h3 className="text-center text-white text-lg md:text-xl mb-8">
          ¡Descubre la diferentes <span className="font-bold">categorías</span>{' '}
          <span className="text-[#C5A028]">que tenemos para ti!</span>
        </h3>

        <div className="relative flex items-center">
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!canScrollLeft}
            aria-label="Anterior"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-4 px-12 mx-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((c) => (
              <div key={c.label} className="flex-shrink-0">
                <Category {...c} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!canScrollRight}
            aria-label="Siguiente"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-white mt-8 text-sm md:text-base">
          Los mejores productos <span className="font-bold">Colombianos</span>
        </p>
      </div>
    </section>
  );
};

CategoriesCarousel.displayName = 'CategoriesCarousel';


export default CategoriesCarousel;
