import React from 'react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

const StoresPage = () => {
  const stores = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Tienda ${i + 1}`,
    city: 'Bogota',
    thumb: '/images/landing/about-vendors.webp',
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[220px] md:h-[260px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/hero-bg-3.webp"
              alt="Tiendas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Tiendas
              </h1>
              <p className="text-[#C5A028] mt-2">Emprendimientos de Colombia</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {stores.map((s) => (
                <div
                  key={s.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={s.thumb}
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold">{s.name}</h3>
                    <p className="text-gray-500 text-sm">{s.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StoresPage;
