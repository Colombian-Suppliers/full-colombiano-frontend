import React from 'react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

const EntriesArticlesPage = () => {
  const entries = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: `Entrada/Articulo ${i + 1}`,
    summary:
      'Contenido editorial con consejos, tendencias y hallazgos de la comunidad.',
    image: '/images/landing/about-hero.webp',
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[220px] md:h-[260px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/hero-bg-3.webp"
              alt="Entradas y Articulos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Entradas y Articulos
              </h1>
              <p className="text-[#C5A028] mt-2">Contenido editorial</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((e) => (
                <article
                  key={e.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold mb-2">
                      {e.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{e.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EntriesArticlesPage;
