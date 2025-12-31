// @ts-nocheck
import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface Benefit {
  title: string;
  description: string;
}

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem = ({ title, description }: BenefitItemProps) => (
  <div className="flex items-start gap-3">
    <div className="shrink-0 w-6 h-6 rounded-full bg-[#72B059] flex items-center justify-center mt-0.5">
      <FiCheck className="w-4 h-4 text-white" />
    </div>
    <div>
      <h4 className="typo-benefit-item-title">{title}</h4>
      <p className="typo-benefit-item-desc">{description}</p>
    </div>
  </div>
);

export const Benefits = () => {
  const benefits: Benefit[] = [
    {
      title: 'Visibilidad nacional:',
      description: 'Llega a miles de compradores en todo el país.',
    },
    {
      title: 'Pagos seguros:',
      description: 'Integración con pasarelas colombianas.',
    },
    {
      title: 'Logística confiable:',
      description: 'Aliados logísticos nacionales.',
    },
    {
      title: 'Soporte humano:',
      description: 'Acompañamiento y capacitación gratuita.',
    },
    {
      title: 'Solo comisión por venta:',
      description: 'Publicar no tiene costo.',
    },
  ];

  return (
    <section
      className="py-16 lg:py-24 relative bg-cover bg-center bg-no-repeat min-h-[500px] lg:min-h-[600px]"
      style={{ backgroundImage: `url('/images/landing/benefits-bg.webp')` }}
    >
      {/* Overlay with dark pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Decorative pattern (texture) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/landing/pattern-overlay.png')`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="max-w-lg">
          {/* Title */}
          <h2 className="typo-benefits-title-primary mb-2">Nuestros</h2>
          <h3 className="typo-benefits-title-secondary mb-10">Beneficios</h3>

          {/* Benefits List */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Benefits.displayName = 'Benefits';


export default Benefits;
