import React from 'react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

const TermsPage = () => {
  const sections = [
    {
      title: 'Definiciones',
      content:
        'Este documento establece los terminos y condiciones para el uso de la plataforma Full Colombiano. Al utilizar nuestros servicios aceptas estas condiciones.',
    },
    {
      title: 'Registro y cuentas',
      content:
        'Para vender o comprar deberas crear una cuenta verificada. Eres responsable de mantener la confidencialidad de tus credenciales y de la informacion suministrada.',
    },
    {
      title: 'Publicacion de productos',
      content:
        'Los productos deben cumplir con la normativa vigente y nuestras politicas. Nos reservamos el derecho de retirar publicaciones que incumplan las reglas.',
    },
    {
      title: 'Pagos y comisiones',
      content:
        'La publicacion es gratuita. Se aplica comision por venta segun categoria. Los pagos se procesan de forma segura hacia la cuenta registrada.',
    },
    {
      title: 'Envios y devoluciones',
      content:
        'Trabajamos con operadores logisticos aliados. El vendedor es responsable del despacho y de gestionar devoluciones conforme a la politica indicada en su tienda.',
    },
    {
      title: 'Propiedad intelectual',
      content:
        'El contenido, marcas e imagenes de Full Colombiano estan protegidos. No esta permitido su uso sin autorizacion expresa.',
    },
    {
      title: 'Privacidad y datos',
      content:
        'Tratamos datos personales de acuerdo con nuestra Politica de Privacidad y las leyes aplicables. Puedes ejercer tus derechos mediante los canales de contacto.',
    },
    {
      title: 'Modificaciones',
      content:
        'Podemos actualizar estos terminos. Las modificaciones se comunicaran por los medios habituales y seran efectivas a partir de su publicacion.',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[240px] md:h-[300px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/hero-bg-2.webp"
              alt="Terminos y Condiciones"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Terminos y Condiciones
              </h1>
              <p className="text-[#C5A028] mt-2">
                Uso de la plataforma y politicas
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <aside className="lg:col-span-3">
                <div className="bg-[#f7f7f7] rounded-xl p-6">
                  <h2 className="text-gray-800 font-semibold mb-4">Indice</h2>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {sections.map((s) => (
                      <li key={s.title} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#72B059] mr-2" />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="lg:col-span-9">
                <div className="space-y-8">
                  {sections.map((s) => (
                    <section
                      key={s.title}
                      className="border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                        {s.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {s.content}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
