// @ts-nocheck
import React from 'react';
import { ReactNode } from 'react';

export interface BannerProps {
  children?: ReactNode;
  backgroundImage?: string;
}

/**
 * Banner
 * Decorative banner with green background and highlighted text
 * Used after AboutUs section
 */
export const Banner = ({
  children,
  backgroundImage = '/images/landing/banner-bg.webp',
}: BannerProps) => {
  return (
    <div className="relative text-white py-8 lg:py-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="relative container mx-auto px-4 lg:px-8 text-center">
        <p className="typo-banner">
          {children || 'Inspirados en nuestras raíces, creados para el mundo.'}
        </p>
      </div>
    </div>
  );
};

Banner.displayName = 'Banner';


export default Banner;
