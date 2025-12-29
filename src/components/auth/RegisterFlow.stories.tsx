// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import {
  AccountTypeSelector,
  BuyerStep1PersonalInfo,
  BuyerStep2PersonalInfo,
  BuyerStep3Credentials,
  SellerStep1PersonType,
  SellerStep2StoreInfo,
  NaturalStep2PersonalInfo,
  NaturalStep3Credentials,
  JuridicaStep2CompanyInfo,
  JuridicaStep3Representative,
  JuridicaStep4Credentials,
} from '@/components/auth';

/**
 * Complete Registration Flow
 * This story demonstrates the entire registration process with all steps
 */
const RegisterFlowWrapper = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    vendorType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    documentType: '',
    documentNumber: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    storeDescription: '',
    companyName: '',
    companyDocumentType: '',
    companyDocumentNumber: '',
  });

  const register = () => ({});
  const watch = (field) => formData[field];
  const setValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const getValues = () => formData;
  const errors = {}; // Empty errors object for Storybook
  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  const handleNext = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    // Step 1: Account Type Selection
    if (step === 1) {
      return (
        <AccountTypeSelector
          register={register}
          watch={watch}
          next={next}
          setValue={setValue}
        />
      );
    }

    // Buyer Flow
    if (formData.role === 'buyer') {
      if (step === 2) {
        return (
          <BuyerStep1PersonalInfo
            register={register}
            watch={watch}
            errors={errors}
            next={next}
            prev={prev}
          />
        );
      }
      if (step === 3) {
        return (
          <BuyerStep2PersonalInfo
            register={register}
            errors={errors}
            back={back}
            handleNext={handleNext}
          />
        );
      }
      if (step === 4) {
        return (
          <BuyerStep3Credentials
            register={register}
            watch={watch}
            errors={errors}
            isLoading={false}
            prev={prev}
          />
        );
      }
    }

    // Seller Flow
    if (formData.role === 'seller') {
      if (step === 2) {
        return (
          <SellerStep1PersonType
            register={register}
            watch={watch}
            next={next}
            prev={prev}
            setValue={setValue}
          />
        );
      }
      if (step === 3) {
        return (
          <SellerStep2StoreInfo
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
      }

      // Natural Person Flow
      if (formData.vendorType === 'natural') {
        if (step === 4) {
          return (
            <NaturalStep2PersonalInfo
              register={register}
              watch={watch}
              errors={errors}
              next={next}
              prev={prev}
            />
          );
        }
        if (step === 5) {
          return (
            <NaturalStep3Credentials
              register={register}
              watch={watch}
              errors={errors}
              isLoading={false}
              prev={prev}
            />
          );
        }
      }

      // Juridica Person Flow
      if (formData.vendorType === 'juridica') {
        if (step === 4) {
          return (
            <JuridicaStep2CompanyInfo
              register={register}
              watch={watch}
              errors={errors}
              next={next}
              prev={prev}
            />
          );
        }
        if (step === 5) {
          return (
            <JuridicaStep3Representative
              register={register}
              watch={watch}
              errors={errors}
              next={next}
              prev={prev}
            />
          );
        }
        if (step === 6) {
          return (
            <JuridicaStep4Credentials
              register={register}
              watch={watch}
              errors={errors}
              isLoading={false}
              prev={prev}
            />
          );
        }
      }
    }

    return <div>Registro completado!</div>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-4xl mx-auto animate-fade-in shadow-lg border-primary-200 p-8">
        <div className="animate-slide-up pb-6">
          <h1 className="text-3xl font-bold text-center text-primary-600 mb-3">
            {step === 1 && 'Crear cuenta'}
            {step === 2 && formData.role === 'seller' && 'Crear cuenta de vendedor'}
            {step >= 2 && formData.role === 'buyer' && 'Crear cuenta'}
            {step >= 3 && formData.role === 'seller' && 'Crear cuenta de vendedor'}
          </h1>
          <p className="text-center text-gray-500 text-base mb-4">
            Paso {step} de{' '}
            {formData.role === 'buyer'
              ? 4
              : formData.vendorType === 'natural'
              ? 5
              : formData.vendorType === 'juridica'
              ? 6
              : '?'}
          </p>
        </div>
        {renderStep()}
      </Card>
    </div>
  );
};

const meta = {
  title: 'Auth/RegisterFlow',
  component: RegisterFlowWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegisterFlowWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteFlow: Story = {
  render: () => <RegisterFlowWrapper />,
};

