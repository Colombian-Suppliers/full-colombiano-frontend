'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

/**
 * AboutUs Page
 * Página de "Quiénes Somos" con información sobre Full Colombiano
 */
export default function AboutUsPage() {
  // Estado para el carrusel de propósito
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos de los slides del carrusel
  const proposalSlides = [
    {
      image: '/images/landing/about-slide-1.webp',
      title: 'Al mal tiempo, buena cara',
      content: [
        'En Full Colombiano creemos que el país crece cuando apoyamos a quienes impulsan el desarrollo local. Por eso trabajamos para que los productos de nuestros emprendedores lleguen a más personas en todo el país.',
        'Cada vez que elegimos productos #DeOrigenColombiano impulsamos un ciclo positivo: aumentan las ventas, crecen los negocios, se generan empleos y miles de familias mejoran su calidad de vida.',
        'Así fortalecemos la economía, promovemos el consumo local y demostramos que lo nuestro tiene valor, calidad y futuro.',
      ],
      highlight: '#DeOrigenColombiano',
    },
    {
      image: '/images/landing/about-slide-2.webp',
      title: 'Innovación con raíces',
      content: [
        'Combinamos tecnología y tradición para llevar los productos colombianos a nuevos mercados. Nuestra plataforma conecta a emprendedores con compradores que buscan autenticidad.',
        'Creemos en el poder de lo digital para amplificar el alcance de los pequeños productores, sin perder la esencia de lo artesanal y lo hecho con amor.',
        'Cada venta es una victoria compartida entre quien crea y quien valora lo nuestro.',
      ],
      highlight: null,
    },
    {
      image: '/images/landing/about-slide-3.webp',
      title: 'Comunidad que crece junta',
      content: [
        'Más que un marketplace, somos una comunidad de emprendedores, artesanos y compradores conscientes que creen en Colombia.',
        'Facilitamos conexiones reales entre productores y consumidores, creando relaciones de confianza que trascienden la simple transacción comercial.',
        'Juntos construimos un ecosistema donde el talento colombiano florece y se reconoce.',
      ],
      highlight: null,
    },
    {
      image: '/images/landing/about-slide-4.webp',
      title: 'Calidad que nos representa',
      content: [
        'Cada producto en Full Colombiano cuenta una historia de dedicación, creatividad y orgullo nacional. Promovemos estándares de calidad que reflejan lo mejor de nuestro país.',
        'Apoyamos a los emprendedores en su proceso de mejora continua, brindando herramientas y visibilidad para que sus productos destaquen.',
        'La excelencia colombiana merece ser vista y celebrada.',
      ],
      highlight: null,
    },
    {
      image: '/images/landing/about-slide-5.webp',
      title: 'Un futuro prometedor',
      content: [
        'Soñamos con un Colombia donde emprender sea sinónimo de éxito, donde cada idea tenga la oportunidad de convertirse en realidad.',
        'Trabajamos día a día para democratizar el acceso al comercio electrónico y dar voz a miles de emprendedores en todo el territorio nacional.',
        'El futuro de Colombia se construye apoyando lo nuestro, y ese futuro empieza hoy.',
      ],
      highlight: null,
    },
  ];

  // Auto-advance del carrusel cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % proposalSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [proposalSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Header de navegación */}
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[280px] md:h-[320px] overflow-hidden">
          {/* Imagen de fondo con overlay */}
          <div className="absolute inset-0">
            <img
              src="/images/landing/about-hero.webp"
              alt="Productos colombianos artesanales"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Contenido del Hero */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <h1 className="text-center px-4">
              <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl">
                Full Colombiano,{' '}
              </span>
              <span className="text-[#C5A028] font-normal italic text-3xl md:text-4xl lg:text-5xl">
                el marketplace de todos los colombianos
              </span>
            </h1>
          </div>
        </section>

        {/* Primera Sección - Quiénes Somos */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Columna de texto */}
              <div className="space-y-6">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Full Colombiano funciona como un centro comercial virtual
                  abierto 24/7, donde{' '}
                  <span className="text-[#C5A028] font-medium">
                    emprendedores de todo el país pueden mostrar sus productos
                  </span>
                  , dar a conocer su marca y conectar con compradores que
                  valoran el talento nacional.
                </p>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Le apostamos a lo hecho en Colombia y a las historias detrás
                  de cada producto. Nuestro compromiso es con los miles de
                  colombianos que se atrevieron a emprender y que, con su
                  trabajo, hacen grande a nuestro país. También con quienes
                  apoyan el talento local y buscan la originalidad y la calidad
                  de lo auténticamente colombiano.
                </p>

                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  <span className="font-bold">
                    Full Colombiano nació para visibilizar a nuestros
                    emprendedores y demostrar que,{' '}
                  </span>
                  <span className="text-[#72B059] font-medium">
                    cuando elegimos lo nuestro, podemos transformar a Colombia.
                  </span>
                </p>
              </div>

              {/* Columna de imagen */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <img
                    src="/images/landing/about-vendors.webp"
                    alt="Emprendedores colombianos mostrando sus productos"
                    className="relative z-10 w-full max-w-md lg:max-w-lg rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center mt-16">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
                Sé parte de esta historia.{' '}
                <span className="text-[#72B059]">¡Contamos contigo!</span>
              </h2>
            </div>
          </div>
        </section>

        {/* Sección Nuestro Propósito - Carrusel */}
        <section
          className="py-16 md:py-20 relative"
          style={{
            backgroundImage: 'url(/images/landing/about-pattern-border.webp)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            {/* Título de la sección */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4">
                <span className="text-[#C5A028] font-medium">
                  Nuestro propósito:{' '}
                </span>
                <span className="text-white font-bold">
                  Construir un país desde el emprendimiento
                </span>
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-3xl mx-auto">
                En Full Colombiano nos comprometemos con los emprendedores
                colombianos y con la transformación del país. Sabemos que no
                estamos solos: este es un sueño compartido con millones de
                colombianos que trabajan por un país próspero para todos.
              </p>
            </div>

            {/* Carrusel */}
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl">
                {/* Slides */}
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {proposalSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 rounded-2xl overflow-hidden relative h-64 md:h-[420px]"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* overlay para mejorar contraste */}
                      <div className="absolute inset-0 bg-black/30" />

                      {/* Contenido del slide */}
                      <div className="relative z-10 flex items-center h-full">
                        <div className="px-4 md:px-8 py-6 md:py-8 w-full md:w-1/2 lg:w-2/5">
                          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 md:p-8">
                            <h3 className="text-[#C5A028] font-bold text-xl md:text-2xl mb-4">
                              {slide.title}
                            </h3>
                            <div className="space-y-4">
                              {slide.content.map((paragraph, pIndex) => (
                                <p
                                  key={pIndex}
                                  className="text-white/95 text-sm md:text-base leading-relaxed"
                                >
                                  {slide.highlight &&
                                  paragraph.includes(slide.highlight) ? (
                                    <>
                                      {paragraph.split(slide.highlight)[0]}
                                      <span className="text-[#C5A028] font-semibold">
                                        {slide.highlight}
                                      </span>
                                      {paragraph.split(slide.highlight)[1]}
                                    </>
                                  ) : (
                                    paragraph
                                  )}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores del carrusel */}
              <div className="flex justify-center gap-2 mt-6">
                {proposalSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-white w-6'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección ¿Qué esperas para unirte? */}
        <section className="relative min-h-[500px] md:min-h-[550px] overflow-hidden">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <img
              src="/images/landing/about-join-bg.webp"
              alt="Colombia"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido */}
          <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center min-h-[500px] md:min-h-[550px] pt-20 pb-12">
              {/* Columna izquierda - Texto y botones */}
              <div className="space-y-6 lg:col-span-7">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  <span className="text-white">¿Qué esperas</span>
                  <br />
                  <span className="text-[#C5A028]">para unirte?</span>
                </h2>

                <p className="text-white/80 text-base md:text-lg max-w-md">
                  Sé parte de esta gran comunidad y ayuda a impulsar el
                  crecimiento de los emprendedores colombianos.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center justify-center px-8 py-3 bg-[#72B059] hover:bg-[#5a9045] text-white font-semibold rounded-full transition-colors duration-300 min-w-[140px]"
                  >
                    Comprar
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-[#C5A028] text-[#C5A028] hover:bg-[#C5A028] hover:text-white font-semibold rounded-full transition-colors duration-300 min-w-[140px]"
                  >
                    Vender
                  </Link>
                </div>
              </div>

              {/* Columna derecha - Imágenes de personas */}
              <div className="hidden lg:flex justify-end items-end relative h-full lg:col-span-5 lg:-translate-x-16">
                <img
                  src="/images/landing/about-join-people.webp"
                  alt="Emprendedores colombianos"
                  className="max-h-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

