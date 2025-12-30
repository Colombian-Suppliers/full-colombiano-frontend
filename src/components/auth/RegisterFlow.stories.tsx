// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { AccountTypeSelector } from '@/components/auth/shared';
import { 
  Step1PersonalInfo as BuyerStep1PersonalInfo,
  Step3Credentials as BuyerStep3Credentials,
} from '@/components/auth/buyer';
import {
  Step1PersonType as SellerStep1PersonType,
  Step2StoreInfo as SellerStep2StoreInfo,
} from '@/components/auth/seller';
import {
  Step2PersonalInfo as NaturalStep2PersonalInfo,
  Step3Credentials as NaturalStep3Credentials,
} from '@/components/auth/seller/natural';
import {
  Step2CompanyInfo as JuridicaStep2CompanyInfo,
  Step3Representative as JuridicaStep3Representative,
  Step4Credentials as JuridicaStep4Credentials,
} from '@/components/auth/seller/juridica';

/**
 * Complete Registration Flow with Real Validation
 * This story demonstrates the entire registration process with working validation
 */
const RegisterFlowWrapper = () => {
  const [step, setStep] = useState(1);
  
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      role: '',
      vendorType: '',
      firstName: '',
      lastName: '',
      email: '',
      emailConfirm: '',
      phone: '',
      documentType: 'CC',
      documentNumber: '',
      password: '',
      passwordConfirm: '',
      terms: false,
      storeName: '',
      storePhone: '',
      storeCategory: '',
      storeDept: '',
      storeCity: '',
      storeAddress: '',
      storeAddressLine2: '',
      companyName: '',
      companyDocumentType: 'NIT',
      companyDocumentNumber: '',
      representativeFirstName: '',
      representativeLastName: '',
      representativeDocumentType: 'CC',
      representativeDocumentNumber: '',
    },
  });

  // Mock departments and cities data
  const departments = ['Antioquia', 'Bogotá D.C.', 'Valle del Cauca', 'Atlántico', 'Cundinamarca'];
  
  const citiesByDepartment: Record<string, string[]> = {
    'Antioquia': ['Medellín', 'Envigado', 'Bello', 'Itagüí', 'Sabaneta', 'La Estrella'],
    'Bogotá D.C.': ['Bogotá'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Cartago'],
    'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga'],
    'Cundinamarca': ['Soacha', 'Facatativá', 'Chía', 'Zipaquirá', 'Fusagasugá'],
  };
  
  // Get cities for selected department
  const selectedDept = watch('storeDept');
  const storeCities = selectedDept ? citiesByDepartment[selectedDept] || [] : [];

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  const back = () => setStep((prev) => prev - 1);
  
  // Validation before moving to next step
  const handleNext = async () => {
    const role = watch('role');
    const vendorType = watch('vendorType');
    
    let fieldsToValidate: string[] = [];
    
    // Determine which fields to validate based on current step
    if (step === 2 && role === 'buyer') {
      fieldsToValidate = ['firstName', 'lastName', 'documentType', 'documentNumber'];
    } else if (step === 3 && role === 'seller') {
      fieldsToValidate = ['storeName', 'storePhone', 'storeCategory', 'storeDept', 'storeCity', 'storeAddress'];
    } else if (step === 4 && vendorType === 'natural') {
      fieldsToValidate = ['firstName', 'lastName', 'documentType', 'documentNumber', 'phone'];
    } else if (step === 4 && vendorType === 'juridica') {
      fieldsToValidate = ['companyName', 'companyDocumentType', 'companyDocumentNumber'];
    } else if (step === 5 && vendorType === 'juridica') {
      fieldsToValidate = ['representativeFirstName', 'representativeLastName', 'representativeDocumentType', 'representativeDocumentNumber'];
    }
    
    // Trigger validation for the fields
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (isValid) {
        next();
      }
    } else {
      next();
    }
  };

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

    // Buyer Flow (2 steps: Personal Info + Credentials)
    if (watch('role') === 'buyer') {
      if (step === 2) {
        return (
          <BuyerStep1PersonalInfo
            register={register}
            watch={watch}
            errors={errors}
            next={handleNext}
            back={back}
          />
        );
      }
      if (step === 3) {
        return (
          <BuyerStep3Credentials
            register={register}
            watch={watch}
            errors={errors}
            isLoading={false}
            back={back}
          />
        );
      }
    }

    // Seller Flow
    if (watch('role') === 'seller') {
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
            departments={departments}
            storeCities={storeCities}
            loadingGeo={false}
            storeDept={selectedDept || ''}
            back={back}
            next={handleNext}
          />
        );
      }

      // Natural Person Flow
      if (watch('vendorType') === 'natural') {
        if (step === 4) {
          return (
            <NaturalStep2PersonalInfo
              register={register}
              watch={watch}
              errors={errors}
              next={handleNext}
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
      if (watch('vendorType') === 'juridica') {
        if (step === 4) {
          return (
            <JuridicaStep2CompanyInfo
              register={register}
              watch={watch}
              errors={errors}
              next={handleNext}
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
              next={handleNext}
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
            {step === 2 && watch('role') === 'seller' && 'Crear cuenta de vendedor'}
            {step >= 2 && watch('role') === 'buyer' && 'Crear cuenta'}
            {step >= 3 && watch('role') === 'seller' && 'Crear cuenta de vendedor'}
          </h1>
          <p className="text-center text-gray-500 text-base mb-4">
            Paso {step} de{' '}
            {watch('role') === 'buyer'
              ? 3
              : watch('vendorType') === 'natural'
              ? 5
              : watch('vendorType') === 'juridica'
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

