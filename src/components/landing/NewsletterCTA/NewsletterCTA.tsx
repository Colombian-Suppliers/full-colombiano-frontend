// @ts-nocheck
'use client';
import React from 'react';

import { useState, FormEvent } from 'react';

export const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'empty' | 'ok'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return setStatus('empty');
    // TODO: Call subscription service
    setStatus('ok');
    setEmail('');
  }

  return (
    <section className="relative">
      <div
        className="py-10 lg:py-12 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url('/images/landing/news-bg.webp')` }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                ¡Mantente al día!
              </h3>
              <p className="text-sm md:text-base text-white/80">
                ¿Quieres estar actualizado? Suscríbete
                <br className="hidden lg:block" />a nuestro Boletín Bacano
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto max-w-xl"
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                aria-label="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 lg:w-80 px-6 py-4 rounded-l-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A028]"
              />
              <button
                type="submit"
                className="bg-[#72B059] hover:bg-[#5a9045] text-white font-bold px-8 py-4 rounded-r-full transition-colors uppercase tracking-wide text-sm"
              >
                Suscribirme
              </button>
            </form>
          </div>

          {status === 'ok' && (
            <p className="text-center text-[#C5A028] mt-4 font-medium">
              ¡Gracias por suscribirte!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

NewsletterCTA.displayName = 'NewsletterCTA';


export default NewsletterCTA;
