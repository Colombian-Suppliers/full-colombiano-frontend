// @ts-nocheck
'use client';
import React from 'react';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface SlideDescriptionPart {
  text: string;
  highlight?: boolean;
}

interface Slide {
  id: number;
  imageUrl: string;
  title: string[];
  subtitle: string;
  description: string | SlideDescriptionPart[];
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  align: 'left' | 'right';
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: '/images/landing/hero-bg.webp',
    title: ['FULL COLOMBIANO'],
    subtitle: 'el Marketplace de productos colombianos',
    description: [
      {
        text:
          'Somos un centro comercial virtual donde podras conectar con clientes de todo el pais y vender lo mejor de tu trabajo.',
      },
      {
        text: '\nCreemos en el talento nacional, porque si es Full\nColombiano, es ',
      },
      { text: 'Full Bacano', highlight: true },
      { text: '!' },
    ],
    primaryButton: { text: 'REGISTRATE', href: '/register' },
    secondaryButton: { text: 'CONOCE MAS', href: '/about-us' },
    align: 'right',
  },
  {
    id: 2,
    imageUrl: '/images/landing/hero-bg-2.webp',
    title: ['LA', 'COMUNIDAD'],
    subtitle: 'que impulsa los emprendimientos\ncolombianos.',
    description:
      'Cada producto cuenta una historia, cada venta\nimpulsa un sueno. Juntos hacemos crecer a Colombia.',
    primaryButton: { text: 'ÚNETE AHORA', href: '/register' },
    secondaryButton: { text: 'CÓMO FUNCIONA', href: '#how-it-works' },
    align: 'right',
  },
  {
    id: 3,
    imageUrl: '/images/landing/hero-bg-3.webp',
    title: ['REGÍSTRATE'],
    subtitle: 'como vendedor.',
    description:
      'Crea tu tienda y publica tus productos y\nservicios colombianos, rapido, facil y gratis!',
    primaryButton: { text: 'CREA TU TIENDA', href: '/register' },
    secondaryButton: { text: 'VER BENEFICIOS', href: '#benefits' },
    align: 'right',
  },
];

/**
 * Hero
 * Slider with 3 slides that change every 5 seconds with smooth transition
 */
export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  const renderDescription = (description: Slide['description']) => {
    if (typeof description === 'string') return description;

    return description.map((part, index) => (
      <span
        key={`${part.text}-${index}`}
        className={
          part.highlight ? 'font-sans font-semibold text-[#FFBB00]' : undefined
        }
      >
        {part.text}
      </span>
    ));
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Images - All slides stacked */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${s.imageUrl})` }}
        />
      ))}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/45" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 2px, transparent 2px, transparent 10px)',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 lg:px-8 h-full">
        <div className="flex items-center min-h-[650px] lg:min-h-[750px] pt-16 pb-44 md:pb-40 lg:pb-36 justify-center lg:justify-end">
          {/* Text Content - Left aligned, positioned right */}
          <div
            className={`w-full lg:w-1/2 xl:w-[50%] text-left transition-all duration-700 ease-in-out ${
              isTransitioning
                ? 'opacity-0 translate-y-4'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Main Title */}
            <h1 className="font-display font-black tracking-tight text-white drop-shadow-lg text-[44px] sm:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px]">
              {slide.title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < slide.title.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 font-display font-semibold text-[#FFBB00] whitespace-pre-line text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]">
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="mt-4 font-sans font-medium text-white whitespace-pre-line leading-relaxed text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] max-w-lg">
              {renderDescription(slide.description)}
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-5 lg:pl-2">
              <Link
                href={slide.primaryButton.href}
                className="inline-flex items-center justify-center bg-secondary-600 hover:bg-secondary-700 text-white px-8 sm:px-10 py-3.5 rounded-xl transition-colors shadow-lg min-w-[160px] font-sans font-semibold text-[14px] sm:text-[16px] lg:text-[16px] xl:text-[18px]"
              >
                {slide.primaryButton.text}
              </Link>
              <Link
                href={slide.secondaryButton.href}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-secondary-700 px-8 sm:px-10 py-3.5 rounded-xl transition-colors shadow-lg min-w-[160px] font-sans font-semibold text-[14px] sm:text-[16px] lg:text-[16px] xl:text-[18px]"
              >
                {slide.secondaryButton.text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#C5A028] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Tagline - Special design with partial white background */}
      <div className="absolute bottom-0 inset-x-0">
        <div className="flex w-full">
          <div className="hidden lg:block w-1/3 xl:w-2/5" />
          <div className="relative flex-1 after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-4 after:w-20 after:bg-white lg:after:h-5 lg:after:w-24">
            <div className="relative bg-white rounded-[6px] lg:rounded-[8px] py-6 lg:py-7 -skew-x-12 origin-left">
              <div className="relative container mx-auto px-4 lg:px-8 skew-x-12">
                <p className="text-gray-700 text-lg md:text-xl lg:text-2xl font-light text-center lg:text-left lg:pl-10">
                  Impulsamos el{' '}
                  <span className="font-bold text-[#24610B]">
                    Talento Colombiano.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';


export default Hero;
