'use client';
// @ts-nocheck
import React from 'react';

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface FaqItemProps {
  q: string;
  a: string;
  highlight?: string;
}

interface FaqData {
  q: string;
  a: string;
  highlight?: string;
}

const FaqItem = ({ q, a }: FaqItemProps) => {
  const [open, setOpen] = useState(false);

  const renderQuestion = () => q;

  return (
    <div className="mb-4">
      <button
        className={`w-full text-left py-4 px-6 flex justify-between items-center rounded-xl transition-all duration-300 ${
          open
            ? 'bg-[#e7f2e4] text-gray-800 shadow-md'
            : 'bg-[#e7f2e4] text-gray-800'
        }`}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <span className="font-medium text-sm md:text-base pr-4">
          {open ? q : renderQuestion()}
        </span>
        <FiChevronDown
          className={`w-5 h-5 shrink-0 text-[#72B059] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-6 py-4 text-gray-600 text-sm md:text-base bg-white rounded-b-xl -mt-2 pt-6 shadow-sm whitespace-pre-line">
          {a}
        </div>
      )}
    </div>
  );
};

export const FAQ = () => {
  const faqs: FaqData[] = [
    {
      q: '¿Qué productos se pueden vender en Full Colombiano?',
      a: `Queremos apoyar a los emprendimientos colombianos, por eso contamos con una amplia variedad de categorías donde puedes registrar tus productos. El único requisito es que sean hechos en Colombia.\n\nAsí seguimos impulsando el talento local y creyendo en el poder de quienes crean, emprenden y transforman.`,
      highlight: 'se pueden vender',
    },
    {
      q: '¿Cuánto cuesta publicar mis productos?',
      a: `¡Nada!\nEn Full Colombiano no cobramos registro ni tarifas ocultas.\nSolo aplicamos una pequeña comisión por cada venta.\n\nComo debe ser: las cuentas claras y el chocolate espeso.`,
      highlight: 'cuesta publicar',
    },
    {
      q: '¿Cómo recibo los pagos de mis ventas?',
      a: `Recibirás el dinero de tus ventas en una cuenta bancaria que tengas registrada a tu nombre. Los retiros tienen un costo de $2.500 y estarán disponibles cada 15 días. El monto mínimo para retirar es de $100.000.\n\nFácil, claro y a tu ritmo, como debe ser.\n\nVende tranquilo, que nosotros te acompañamos en el proceso.\n\nSencillo, transparente y hecho para ti.\n\nPorque cada venta cuenta, y cada paso te acerca a tus metas.\n\nSeguimos creciendo contigo, emprendimiento a emprendimiento.\n\nFácil, rápido y sin complique, como nos gusta en Colombia.\n\nPara hacerlo, solo debes seguir los pasos indicados en tu perfil. Estamos a un mensaje de distancia pa' que vender sea una nota.`,
      highlight: 'recibo los pagos',
    },
    {
      q: '¿Puedo retirar mi dinero fácilmente?',
      a: `¡Sí! Solo debes solicitar el retiro de tu dinero dentro de las fechas establecidas cada 15 días.\n\nEl dinero de tus ventas estará disponible para retirar siete días hábiles después de que el comprador reciba el producto y confirme que está satisfecho con su compra. De esta forma, garantizamos el derecho de retracto que tienen los compradores al realizar compras a distancia.\n\nAsí creamos una experiencia segura y confiable para todos.`,
      highlight: 'retirar mi dinero',
    },
    {
      q: '¿Qué comisión cobra Full Colombiano?',
      a: `Full Colombiano cobra una comisión del 15% (IVA incluido) por cada venta. Con eso cubrimos el procesamiento del pago y todos los impuestos y retenciones de ley.\n\nMucho menos de lo que pagarías en un centro comercial, y con la ventaja de llegar a todo el país.`,
      highlight: 'comisión cobra',
    },
  ];

  return (
    <section
      className="py-16 lg:py-20 bg-cover bg-center bg-no-repeat relative min-h-[600px]"
      style={{ backgroundImage: `url('/images/landing/faq-bg.webp')` }}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#72B059]">Preguntas</span>{' '}
            <span className="text-gray-800 font-light">frecuentes</span>
          </h2>
        </div>

        {/* FAQ Items - Centered */}
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} q={faq.q} a={faq.a} highlight={faq.highlight} />
          ))}
        </div>
      </div>
    </section>
  );
};

FAQ.displayName = 'FAQ';


export default FAQ;
