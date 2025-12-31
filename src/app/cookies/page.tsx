import React from 'react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

const CookiesPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[220px] md:h-[260px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/hero-bg-2.webp"
              alt="Politica de Cookies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Politica de Cookies
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-6 max-w-3xl">
              <p className="text-gray-700">
                Usamos cookies para mejorar tu experiencia y analizar el uso de
                la plataforma.
              </p>
              <p className="text-gray-700">
                Puedes gestionar tus preferencias y conocer mas sobre los
                tipos de cookies que utilizamos aqui.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CookiesPage;
