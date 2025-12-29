// @ts-nocheck
import React from 'react';import Image from 'next/image';
import Link from 'next/link';
import {
  FaShoppingCart,
  FaTruck,
  FaBullhorn,
  FaDollarSign,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface IconFeatureProps {
  Icon: IconType;
  title: string;
  subtitle: string;
}

const IconFeature = ({ Icon, title, subtitle }: IconFeatureProps) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
      <Icon className="w-6 h-6" aria-hidden />
    </div>
    <div className="text-white">
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs opacity-90">{subtitle}</div>
    </div>
  </div>
);

export interface AboutUsProps {
  title?: string;
}

export const AboutUs = ({ title = 'Somos Full Colombiano' }: AboutUsProps) => {
  const [firstWord, ...restWords] = title.split(' ');
  const rest = restWords.join(' ');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 mb-8">
        <div className="w-full bg-[#124E02] text-white rounded-lg px-6 py-4 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <IconFeature
              Icon={FaShoppingCart}
              title="Registra tu tienda"
              subtitle="en minutos"
            />
            <IconFeature
              Icon={FaTruck}
              title="Envía tus productos"
              subtitle="fácil y seguro"
            />
            <IconFeature
              Icon={FaBullhorn}
              title="Publica gratis"
              subtitle="tus productos"
            />
            <IconFeature
              Icon={FaDollarSign}
              title="Recibe pagos"
              subtitle="de forma segura"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl mb-6 font-display">
              <span className="mr-2 font-light italic">{firstWord}</span>
              <span className="font-extrabold text-[#72B059]">{rest}</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
              <Link
                href="/"
                className="text-[#72B059] decoration-1 underline-offset-2 hover:text-[#5a9a47]"
              >
                Full Colombiano
              </Link>{' '}
              es un marketplace de productos colombianos.{' '}
              <span className="font-semibold">¿Y eso qué quiere decir?</span>{' '}
              Imagínate un centro comercial que funciona de forma virtual,
              abierto las 24 horas, los 7 días de la semana, donde miles de
              personas podrán comprar tus productos y conocer tu marca, sin
              pagar arriendo y sin complicaciones.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
              En{' '}
              <Link
                href="/"
                className="text-[#72B059] decoration-1 underline-offset-2 hover:text-[#5a9a47]"
              >
                Full Colombiano
              </Link>{' '}
              conectamos compradores y vendedores de todo el país, contamos con
              aliados estratégicos que facilitan los pagos y el transporte de
              tus productos, desde tu tienda hasta las manos de los compradores,
              nosotros nos encargamos del mantenimiento, el soporte y la
              publicidad de la plataforma, para que tú puedas enfocarte en lo
              más importante: crear y ofrecer los mejores productos colombianos.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Creemos en el poder de los emprendedores y en el valor de
              construir juntos un país lleno de oportunidades.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-96">
                <Image
                  src="/images/landing/vid-kev.webp"
                  alt="Full Colombiano video"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutUs.displayName = 'AboutUs';


export default AboutUs;
