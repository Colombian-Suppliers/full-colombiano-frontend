// @ts-nocheck
'use client';
import React from 'react';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Slide {
  id: number;
  imageUrl: string;
  title: string[];
  subtitle: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  align: 'left' | 'right';
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: '/images/landing/hero-bg.webp',
    title: ['FULL', 'COLOMBIANO'],
    subtitle: 'Full Bacano',
    description:
      'Descubre productos 100% colombianos\ncreados por emprendedores que dejan huella\nen cada región del país',
    primaryButton: { text: 'COMPRAR', href: '/marketplace' },
    secondaryButton: { text: 'VENDER', href: '/register' },
    align: 'right',
  },
  {
    id: 2,
    imageUrl: '/images/landing/hero-bg-2.webp',
    title: ['LA', 'COMUNIDAD'],
    subtitle: 'que impulsa los emprendimientos\ncolombianos.',
    description:
      'Cada producto cuenta una historia, cada venta\nimpulsa un sueño. Juntos hacemos crecer a Colombia.',
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
      'Crea tu tienda y publica tus productos y\nservicios colombianos, rápido, fácil y ¡gratis!',
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40" />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 lg:px-8 h-full">
        <div className="flex items-center min-h-[600px] lg:min-h-[700px] py-16 justify-center lg:justify-end">
          {/* Text Content - Left aligned, positioned right */}
          <div
            className={`w-full lg:w-1/2 xl:w-[45%] text-left transition-all duration-700 ease-in-out ${
              isTransitioning
                ? 'opacity-0 translate-y-4'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[0.95] drop-shadow-lg">
              {slide.title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < slide.title.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-xl md:text-2xl lg:text-3xl text-[#C5A028] italic font-light whitespace-pre-line">
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="mt-6 text-sm md:text-base text-white/90 leading-relaxed whitespace-pre-line max-w-md italic">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={slide.primaryButton.href}
                className="inline-flex items-center justify-center bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg min-w-[160px]"
              >
                {slide.primaryButton.text}
              </Link>
              <Link
                href={slide.secondaryButton.href}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-secondary-700 font-bold px-8 py-3 rounded-full transition-colors shadow-lg min-w-[160px]"
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
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex">
          {/* Left side - transparent to see the image */}
          <div className="hidden lg:block w-1/3 xl:w-2/5" />
          {/* Right side - white background with text */}
          <div className="flex-1 bg-white py-5 lg:py-6 lg:rounded-tl-[40px]">
            <div className="container mx-auto px-4 lg:px-8">
              <p className="text-gray-700 text-lg md:text-xl lg:text-2xl font-light text-center lg:text-left lg:pl-8">
                Impulsamos el{' '}
                <span className="font-bold text-[#C5A028] italic">
                  Talento Colombiano.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';


export default Hero;
