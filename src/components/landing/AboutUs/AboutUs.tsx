// @ts-nocheck
import React from 'react';
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
      <div className="font-sans font-bold text-white text-[16px]">{title}</div>
      <div className="font-sans font-normal text-white/90 text-[16px]">
        {subtitle}
      </div>
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
            <h2 className="mb-6 font-display font-medium text-[#1B5903] text-[22px] sm:text-[26px] lg:text-[28px] 2xl:text-[32px]">
              <span className="mr-2 font-light italic">{firstWord}</span>
              <span className="font-extrabold text-[#72B059]">{rest}</span>
            </h2>

            <p className="mb-4 font-sans font-light text-[#2C2C2C] leading-relaxed text-[14px] sm:text-[15px] lg:text-[16px]">
              <Link
                href="/"
                className="font-sans font-bold text-[#72B059] decoration-1 hover:text-[#5a9a47]"
              >
                Full Colombiano
              </Link>{' '}
              es un marketplace de productos colombianos.{' '}
              <span className="font-sans font-bold text-[#2C2C2C]">
                Y eso qué quiere decir?
              </span>{' '}
              Imagínate un centro comercial que funciona de forma virtual,
              abierto las 24 horas, los 7 días de la semana, donde miles de
              personas podrán comprar tus productos y conocer tu marca, sin
              pagar arriendo y sin complicaciones.
            </p>

            <p className="mb-4 font-sans font-light text-[#2C2C2C] leading-relaxed text-[14px] sm:text-[15px] lg:text-[16px]">
              En{' '}
              <Link
                href="/"
                className="font-sans font-bold text-[#72B059] decoration-1 underline underline-offset-2 hover:text-[#5a9a47]"
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

            <p className="font-sans font-light text-[#2C2C2C] leading-relaxed text-[14px] sm:text-[15px] lg:text-[16px]">
              Creemos en el poder de los emprendedores y en el valor de
              construir juntos un país lleno de oportunidades.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#e7e7e7] flex items-center justify-center h-80 md:h-96">
                <button
                  type="button"
                  aria-label="Reproducir video"
                  className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center"
                >
                  <div className="w-0 h-0 border-l-10 border-t-8 border-b-8 border-l-[#72B059] border-t-transparent border-b-transparent ml-1" />
                </button>
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
