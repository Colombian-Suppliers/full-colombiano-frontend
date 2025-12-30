'use client';

import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

/**
 * ContactUs Page
 * Página de Contacto con formulario, información de contacto, FAQs y newsletter
 */
export default function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Quiénes pueden vender en Full Colombiano?',
      answer:
        'Cualquier emprendedor colombiano con productos de calidad puede registrarse como vendedor en nuestra plataforma.',
    },
    {
      question: '¿Qué productos se pueden vender en Full Colombiano?',
      answer:
        'Puedes vender productos artesanales, alimentos, moda, accesorios y más, siempre que cumplan con nuestras políticas.',
    },
    {
      question: '¿Cuánto cuesta publicar mis productos?',
      answer:
        'Publicar tus productos es completamente gratis. Solo cobramos una pequeña comisión por cada venta realizada.',
    },
    {
      question: '¿Cómo recibo los pagos de mis ventas?',
      answer:
        'Los pagos se realizan directamente a tu cuenta bancaria registrada, de forma segura y puntual.',
    },
    {
      question: '¿Puedo retirar mi dinero fácilmente?',
      answer:
        'Sí, puedes solicitar el retiro de tu dinero en cualquier momento desde tu panel de vendedor.',
    },
    {
      question: '¿Qué comisión cobra Full Colombiano?',
      answer:
        'Cobramos una comisión competitiva que varía según la categoría del producto. Consulta los detalles en tu panel.',
    },
    {
      question: '¿Cómo funcionan los envíos?',
      answer:
        'Trabajamos con múltiples operadores logísticos para que puedas enviar tus productos a todo el país.',
    },
    {
      question: '¿Puedo enviar mis productos al exterior?',
      answer:
        'Actualmente operamos solo en Colombia, pero estamos trabajando para expandirnos internacionalmente.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section con formulario */}
        <section className="relative min-h-[600px] md:min-h-[650px]">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 bg-[#5a7a4a]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5a7a4a] to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Columna izquierda - Texto */}
              <div className="text-white pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  <span className="text-[#C5A028]">Tú nos cuentas,</span>
                  <br />
                  <span className="text-white">nosotros te escuchamos</span>
                </h1>
                <p className="text-white/90 text-lg mt-4">
                  ¿Tienes preguntas, sugerencias
                  <br />u opiniones?
                </p>

                <div className="mt-16 md:mt-24">
                  <p className="text-white/90 text-sm leading-relaxed max-w-md">
                    Te invitamos a revisar la sección de preguntas frecuentes,
                    si todavía no encuentras lo que buscas, escríbenos y nos
                    pondremos en contacto contigo lo más pronto posible.
                  </p>
                  <p className="text-[#C5A028] font-semibold mt-4">
                    ¡Estamos aquí para ayudarte!
                  </p>
                </div>
              </div>

              {/* Columna derecha - Formulario */}
              <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
                <div className="mb-6">
                  <span className="text-[#72B059] text-sm font-medium">
                    Preguntas
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    ¡Nos encantará escucharte!
                  </h2>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre / Empresa (obligatorio)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72B059]/50 focus:border-[#72B059] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Número de celular (opcional)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72B059]/50 focus:border-[#72B059] text-sm"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Correo electrónico (obligatorio)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72B059]/50 focus:border-[#72B059] text-sm"
                  />

                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72B059]/50 focus:border-[#72B059] text-sm appearance-none bg-white text-gray-500">
                      <option value="">¿Cómo podemos ayudarte?</option>
                      <option value="ventas">Quiero vender</option>
                      <option value="compras">
                        Tengo una pregunta sobre mi compra
                      </option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="otro">Otro</option>
                    </select>
                    <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>

                  <textarea
                    placeholder="Mensaje"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72B059]/50 focus:border-[#72B059] text-sm resize-none"
                  />

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Subir Archivo
                    </button>
                    <span className="text-xs text-gray-400">
                      Selecciona un archivo o imagen de máximo de 10MB
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#72B059] focus:ring-[#72B059]"
                        />
                        Confirmo que la información suministrada es correcta.
                      </label>
                      <label className="flex items-center gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#72B059] focus:ring-[#72B059]"
                        />
                        Acepto el procesamiento de datos.
                      </label>
                    </div>

                    {/* Placeholder para reCAPTCHA */}
                    <div className="w-[120px] h-[60px] bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                      <span className="text-[10px] text-gray-400 text-center">
                        Confirmar que
                        <br />
                        eres humano
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#72B059] hover:bg-[#5a9045] text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Contacto con Mapa */}
        <section className="py-12 md:py-16 bg-[#f5f0e6]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Información de contacto */}
              <div className="space-y-4">
                <p className="text-gray-800 text-lg">
                  <span className="font-semibold">Atención a vendedores: </span>
                  <span className="text-gray-700">3150751209</span>
                </p>
                <p className="text-gray-800 text-lg">
                  <span className="font-semibold">
                    Atención a compradores:{' '}
                  </span>
                  <span className="text-gray-700">3232491775</span>
                </p>
                <p className="text-gray-800 text-lg">
                  <span className="font-semibold">
                    soporte@fullcolombiano.com
                  </span>
                </p>
              </div>

              {/* Placeholder para Mapa */}
              <div className="h-[250px] md:h-[300px] bg-gray-200 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    Mapa de ubicación
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Preguntas Frecuentes */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
              Preguntas frecuentes
            </h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#72B059] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700 pr-4">
                      {faq.question.split(' ').map((word, i) => {
                        const boldWords = [
                          'vender',
                          'productos',
                          'publicar',
                          'pagos',
                          'retirar',
                          'comisión',
                          'envíos',
                          'enviar',
                        ];
                        const isBold = boldWords.some((bw) =>
                          word.toLowerCase().includes(bw)
                        );
                        return isBold ? (
                          <strong key={i}>{word} </strong>
                        ) : (
                          word + ' '
                        );
                      })}
                    </span>
                    <IoChevronDown
                      className={`w-5 h-5 text-[#72B059] flex-shrink-0 transition-transform duration-200 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Newsletter */}
        <section className="py-10 md:py-12 bg-[#3d5a3a]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold">
                  ¡Mantente al día!
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  ¿Quieres estar actualizado? Suscríbete
                  <br />a nuestro Boletín Becano
                </p>
              </div>

              <div className="flex w-full md:w-auto gap-0">
                <input
                  type="email"
                  placeholder=""
                  className="flex-1 md:w-[300px] lg:w-[400px] px-4 py-3 rounded-l-lg focus:outline-none text-sm"
                />
                <button
                  type="button"
                  className="px-6 py-3 bg-[#72B059] hover:bg-[#5a9045] text-white font-semibold rounded-r-lg transition-colors duration-200 whitespace-nowrap"
                >
                  SUSCRIBIRME
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

