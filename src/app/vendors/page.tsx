'use client';

import Link from 'next/link';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

export default function VendorsPage() {
  const cards = [
    'Un espacio para crecer con tu proyecto',
    'Condiciones justas y transparentes',
    'Requisitos simples para empezar a vender',
    'Una plataforma lista para usar',
    'Publicidad adicional para tu negocio',
    'Impulso a lo hecho en Colombia',
    'Tu dinero seguro y tu cliente satisfecho',
    'Soporte y seguridad para tu tienda',
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[360px] md:h-[420px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/about-vendors.webp"
              alt="Vendedores - Full Colombiano"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Vende en Full Colombiano
                </h1>
                <p className="text-white/90 mb-6">
                  Llega a miles de compradores, impulsa tu emprendimiento y
                  forma parte de la comunidad que promueve lo nuestro.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#72B059] hover:bg-[#5a9045] text-white font-semibold rounded-full transition-colors duration-200"
                  >
                    Regístrate ahora
                  </Link>
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white/20 text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                  >
                    Ver la tienda
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primera Sección - placeholders */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cards.map((title, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md bg-white border border-gray-100"
                >
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    {/* Placeholder for image */}
                    <div className="w-24 h-24 bg-gray-200 rounded" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold text-sm">
                      {title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección grid - lo que Full Colombiano tiene para ti */}
        <section
          className="py-16 md:py-20 relative"
          style={{
            backgroundImage: 'url(/images/landing/hero-bg-3.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Esto es lo que Full Colombiano tiene para ti:
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mt-3">
                Un lugar pensado para impulsar tus ventas y que cada
                emprendimiento crezca con el apoyo de toda la comunidad.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <img
                src="/images/landing/grid-vendors.webp"
                alt="Grid Vendors"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            <div className="text-center mt-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#72B059] font-semibold rounded-full transition-colors duration-200"
              >
                Regístrate ahora
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

