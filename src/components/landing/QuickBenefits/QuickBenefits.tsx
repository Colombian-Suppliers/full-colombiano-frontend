import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface ItemProps {
  title: string;
  description: string;
}

const Item = ({ title, description }: ItemProps) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#72B059] flex items-center justify-center">
      <FiCheck className="w-6 h-6 text-white" />
    </div>
    <p className="leading-snug">
      <span className="font-sans font-bold text-black text-[16px]">
        {title}
      </span>{' '}
      <span className="font-sans font-normal text-black text-[16px]">
        {description}
      </span>
    </p>
  </div>
);

export const QuickBenefits = () => {
  const items: ItemProps[] = [
    { title: 'Crea tu cuenta', description: 'gratis' },
    { title: 'Registra tu tienda', description: 'en minutos' },
    { title: 'Publica gratis', description: 'tus productos' },
    { title: 'Recibe tus pagos', description: 'de forma segura' },
  ];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Item
              key={`${item.title} ${item.description}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

QuickBenefits.displayName = 'QuickBenefits';

export default QuickBenefits;
