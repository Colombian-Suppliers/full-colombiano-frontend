// @ts-nocheck
'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { FaUser, FaBuilding } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface PersonTypeCardProps {
  icon: IconType;
  title: string;
  description: string;
  onClick: () => void;
}

const PersonTypeCard = ({
  icon: Icon,
  title,
  description,
  onClick,
}: PersonTypeCardProps) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center justify-center p-8 md:p-10 bg-[#72B059]/10 rounded-2xl transition-all duration-300 cursor-pointer hover:bg-[#72B059]/20 hover:shadow-lg border-2 border-transparent hover:border-[#72B059]/30"
  >
    <div className="mb-5 w-16 h-16 rounded-xl bg-[#72B059] flex items-center justify-center text-white shadow-md">
      <Icon className="w-8 h-8" />
    </div>
    <h4 className="font-bold text-gray-900 text-xl mb-3">{title}</h4>
    <p className="text-sm text-gray-600 leading-relaxed text-center">
      {description}
    </p>
  </div>
);

export const RegisterSection = () => {
  const router = useRouter();

  const handleSelectType = (type: 'natural' | 'juridica') => {
    router.push(`/register?role=seller&personType=${type}`);
  };

  return (
    <section
      className="py-16 lg:py-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/images/landing/register-bg.webp')` }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-white text-xl md:text-2xl lg:text-3xl italic font-light">
            No dejes para mañana lo que puedes hacer hoy...
          </p>
          <p className="text-[#C5A028] text-xl md:text-2xl lg:text-3xl font-medium mt-2">
            ¡Regístrate y publica tus productos ahora!
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-[#f5f5f5] rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl text-gray-800 font-light">
              Crear cuenta <span className="font-bold">Nueva</span>
            </h3>
            <p className="text-gray-600 mt-2">
              Únete a nuestra comunidad de compradores y vendedores
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <PersonTypeCard
              icon={FaUser}
              title="Natural"
              description="Vende tus productos como persona natural. Rápido y sin papeleo complejo."
              onClick={() => handleSelectType('natural')}
            />
            <PersonTypeCard
              icon={FaBuilding}
              title="Jurídico"
              description="Registra tu empresa y accede a herramientas de administración y pagos"
              onClick={() => handleSelectType('juridica')}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push('/register')}
              className="bg-[#124E02] hover:bg-[#0d3a01] text-white font-bold py-4 px-12 rounded-full transition-colors shadow-lg text-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

RegisterSection.displayName = 'RegisterSection';


export default RegisterSection;
