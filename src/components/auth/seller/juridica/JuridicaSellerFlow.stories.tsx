// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Step1PersonType, Step2StoreInfo } from '../';
import { Step2CompanyInfo, Step3Representative, Step4Credentials } from './';

/**
 * Juridica Person Seller Registration Flow
 * 
 * Complete flow for company sellers (5 steps):
 * 1. Person Type Selection (Natural/Juridica)
 * 2. Store Information
 * 3. Company Information
 * 4. Legal Representative Information
 * 5. Credentials
 */
const JuridicaSellerFlowWrapper = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vendorType: 'juridica',
    storeName: '',
    storeDescription: '',
    storeDept: '',
    storeCity: '',
    companyName: '',
    companyDocumentType: '',
    companyDocumentNumber: '',
    representativeFirstName: '',
    representativeLastName: '',
    representativeDocumentType: '',
    representativeDocumentNumber: '',
    password: '',
    confirmPassword: '',
  });

  const register = () => ({});
  const watch = (field) => formData[field];
  const setValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const getValues = () => formData;
  const errors = {};
  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  const back = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1PersonType
            register={register}
            watch={watch}
            next={next}
            prev={prev}
            setValue={setValue}
          />
        );
      case 2:
        return (
          <Step2StoreInfo
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
            departments={['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca']}
            storeCities={['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta']}
            loadingGeo={false}
            storeDept={formData.storeDept || ''}
            back={back}
            next={next}
          />
        );
      case 3:
        return (
          <Step2CompanyInfo
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            departments={['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca']}
            companyCities={['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta']}
            loadingGeo={false}
            companyDept={formData.companyDept || ''}
            next={next}
            prev={prev}
          />
        );
      case 4:
        return (
          <Step3Representative
            register={register}
            watch={watch}
            errors={errors}
            next={next}
            prev={prev}
          />
        );
      case 5:
        return (
          <Step4Credentials
            register={register}
            watch={watch}
            errors={errors}
            isLoading={false}
            prev={prev}
          />
        );
      default:
        return <div className="text-center text-green-600">¡Registro completado!</div>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-4xl mx-auto animate-fade-in shadow-lg border-primary-200 p-8">
        <div className="animate-slide-up pb-6">
          <h1 className="text-3xl font-bold text-center text-primary-600 mb-3">
            Registro de Vendedor - Persona Jurídica
          </h1>
          <p className="text-center text-gray-500 text-base mb-4">
            Paso {step} de 5
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full transition-all ${
                  s === step
                    ? 'bg-primary-600'
                    : s < step
                    ? 'bg-primary-400'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        {renderStep()}
      </Card>
    </div>
  );
};

const meta = {
  title: 'Auth/Seller/Juridica/CompleteFlow',
  component: JuridicaSellerFlowWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof JuridicaSellerFlowWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const JuridicaPersonFlow: Story = {
  render: () => <JuridicaSellerFlowWrapper />,
};

