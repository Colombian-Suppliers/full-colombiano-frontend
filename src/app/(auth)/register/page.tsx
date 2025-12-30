'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/hooks/useAuth';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import ROUTES from '@/config/routes.config';
import { TOAST_MESSAGES } from '@/utils/toastMessages';
import { geoApiService } from '@/lib/services/geo.service';
import { Card } from '@/components/ui/Card/Card';
import { AccountTypeSelector } from '@/components/auth/shared';
import { 
  Step1PersonalInfo as BuyerStep1PersonalInfo,
  Step3Credentials as BuyerStep3Credentials 
} from '@/components/auth/buyer';
import { 
  Step1PersonType,
  Step2StoreInfo 
} from '@/components/auth/seller';
import { 
  Step2PersonalInfo as NaturalStep2PersonalInfo,
  Step3Credentials as NaturalStep3Credentials 
} from '@/components/auth/seller/natural';
import { 
  Step2CompanyInfo as JuridicaStep2CompanyInfo,
  Step3Representative as JuridicaStep3Representative,
  Step4Credentials as JuridicaStep4Credentials 
} from '@/components/auth/seller/juridica';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading, error: authError, clearError } = useAuth();
  const [step, setStep] = useState(1);

  // Geographic data
  const [departments, setDepartments] = useState<any[]>([]);
  const [storeCities, setStoreCities] = useState<any[]>([]);
  const [personalCities, setPersonalCities] = useState<any[]>([]);
  const [companyCities, setCompanyCities] = useState<any[]>([]);
  const [loadingGeo, setLoadingGeo] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: '',
      personType: '',
      // Buyer fields
      firstName: '',
      lastName: '',
      documentType: '',
      documentNumber: '',
      // Store fields
      storeName: '',
      storeUrl: '',
      storeCategory: null,
      storePhone: '',
      storeDept: '',
      storeCity: '',
      storeAddress: '',
      // Natural person fields
      idType: '',
      idNumber: '',
      personalPhone: '',
      personalDept: '',
      personalCity: '',
      personalAddress: '',
      personalEmail: '',
      // Company fields
      companyName: '',
      companyNITNumber: '',
      companyNITDigit: '',
      companyNIT: '',
      companyPhone: '',
      companyEmail: '',
      companyDept: '',
      companyCity: '',
      companyAddress: '',
      // Representative fields
      repFirstName: '',
      repLastName: '',
      repIdType: '',
      repIdNumber: '',
      repPhone: '',
      repEmail: '',
      repConfirmEmail: '',
      // Credentials fields
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptPrivacy: false,
      electronicBilling: null,
    },
    mode: 'all',
  });

  const role = watch('role');
  const personType = watch('personType');
  const storeDept = watch('storeDept');
  const personalDept = watch('personalDept');
  const companyDept = watch('companyDept');

  // Load departments on mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoadingGeo(true);
        const depts = await geoApiService.getDepartments();
        setDepartments(depts);
      } catch (err) {
        console.error('Error loading departments:', err);
        showErrorToast(
          TOAST_MESSAGES.GEO_ERROR || 'Error al cargar departamentos'
        );
      } finally {
        setLoadingGeo(false);
      }
    };
    loadDepartments();
  }, []);

  // Load store cities when department changes
  useEffect(() => {
    const loadStoreCities = async () => {
      if (storeDept) {
        try {
          setLoadingGeo(true);
          const cities = await geoApiService.getCities(storeDept);
          setStoreCities(cities);
          setValue('storeCity', '');
        } catch (err) {
          console.error('Error loading store cities:', err);
          showErrorToast(
            TOAST_MESSAGES.GEO_ERROR || 'Error al cargar ciudades'
          );
        } finally {
          setLoadingGeo(false);
        }
      }
    };
    loadStoreCities();
  }, [storeDept, setValue]);

  // Load personal cities when department changes
  useEffect(() => {
    const loadPersonalCities = async () => {
      if (personalDept) {
        try {
          setLoadingGeo(true);
          const cities = await geoApiService.getCities(personalDept);
          setPersonalCities(cities);
          setValue('personalCity', '');
        } catch (err) {
          console.error('Error loading personal cities:', err);
          showErrorToast(
            TOAST_MESSAGES.GEO_ERROR || 'Error al cargar ciudades'
          );
        } finally {
          setLoadingGeo(false);
        }
      }
    };
    loadPersonalCities();
  }, [personalDept, setValue]);

  // Load company cities when department changes
  useEffect(() => {
    const loadCompanyCities = async () => {
      if (companyDept) {
        try {
          setLoadingGeo(true);
          const cities = await geoApiService.getCities(companyDept);
          setCompanyCities(cities);
          setValue('companyCity', '');
        } catch (err) {
          console.error('Error loading company cities:', err);
          showErrorToast(
            TOAST_MESSAGES.GEO_ERROR || 'Error al cargar ciudades'
          );
        } finally {
          setLoadingGeo(false);
        }
      }
    };
    loadCompanyCities();
  }, [companyDept, setValue]);

  const totalSteps = () => {
    if (role === 'buyer') return 3; // Step 1: Account type, Step 2: Personal info, Step 3: Credentials
    if (role === 'seller') return personType === 'juridica' ? 6 : 5;
    return 1;
  };

  const getAdjustedStep = () => {
    if (role === 'buyer') return step - 1;
    if (role === 'seller') return step - 2;
    return step;
  };

  const getAdjustedTotalSteps = () => {
    if (role === 'buyer') return 2;
    if (role === 'seller') return personType === 'juridica' ? 4 : 3;
    return 1;
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps()));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const _handleNext = async () => {
    const values = getValues();
    let isValid = true;

    // Validate based on current step and role
    if (role === 'buyer' && step === 2) {
      // Validate buyer personal info
      if (!values.firstName || values.firstName.length < 2) {
        setError('firstName', { 
          type: 'manual', 
          message: 'Los nombres deben tener al menos 2 caracteres' 
        });
        isValid = false;
      }
      if (!values.lastName || values.lastName.length < 3) {
        setError('lastName', { 
          type: 'manual', 
          message: 'Los apellidos deben tener al menos 3 caracteres' 
        });
        isValid = false;
      }
      if (!values.documentType) {
        setError('documentType', { 
          type: 'manual', 
          message: 'El tipo de documento es requerido' 
        });
        isValid = false;
      }
      if (!values.documentNumber) {
        setError('documentNumber', { 
          type: 'manual', 
          message: 'El número de documento es requerido' 
        });
        isValid = false;
      }
    } else if (role === 'seller' && step === 3) {
      // Validate store info
      if (!values.storeName || values.storeName.length < 3) {
        setError('storeName', { 
          type: 'manual', 
          message: 'El nombre de la tienda debe tener al menos 3 caracteres' 
        });
        isValid = false;
      }
      if (!values.storeUrl) {
        setError('storeUrl', { 
          type: 'manual', 
          message: 'La URL de la tienda es requerida' 
        });
        isValid = false;
      }
      if (!values.storeCategory) {
        setError('storeCategory', { 
          type: 'manual', 
          message: 'La categoría de la tienda es requerida' 
        });
        isValid = false;
      }
      if (!values.storePhone) {
        setError('storePhone', { 
          type: 'manual', 
          message: 'El teléfono de la tienda es requerido' 
        });
        isValid = false;
      }
      if (!values.storeDept) {
        setError('storeDept', { 
          type: 'manual', 
          message: 'El departamento es requerido' 
        });
        isValid = false;
      }
      if (!values.storeCity) {
        setError('storeCity', { 
          type: 'manual', 
          message: 'La ciudad es requerida' 
        });
        isValid = false;
      }
      if (!values.storeAddress) {
        setError('storeAddress', { 
          type: 'manual', 
          message: 'La dirección es requerida' 
        });
        isValid = false;
      }
    } else if (role === 'seller' && personType === 'natural' && step === 4) {
      // Validate natural person info
      if (!values.idType) {
        setError('idType', { 
          type: 'manual', 
          message: 'El tipo de documento es requerido' 
        });
        isValid = false;
      }
      if (!values.idNumber) {
        setError('idNumber', { 
          type: 'manual', 
          message: 'El número de documento es requerido' 
        });
        isValid = false;
      }
      if (!values.personalPhone) {
        setError('personalPhone', { 
          type: 'manual', 
          message: 'El teléfono es requerido' 
        });
        isValid = false;
      }
      if (!values.personalDept) {
        setError('personalDept', { 
          type: 'manual', 
          message: 'El departamento es requerido' 
        });
        isValid = false;
      }
      if (!values.personalCity) {
        setError('personalCity', { 
          type: 'manual', 
          message: 'La ciudad es requerida' 
        });
        isValid = false;
      }
      if (!values.personalAddress) {
        setError('personalAddress', { 
          type: 'manual', 
          message: 'La dirección es requerida' 
        });
        isValid = false;
      }
    } else if (role === 'seller' && personType === 'juridica' && step === 4) {
      // Validate company info
      if (!values.companyName) {
        setError('companyName', { 
          type: 'manual', 
          message: 'El nombre de la empresa es requerido' 
        });
        isValid = false;
      }
      if (!values.companyNITNumber) {
        setError('companyNITNumber', { 
          type: 'manual', 
          message: 'El NIT es requerido' 
        });
        isValid = false;
      }
      if (!values.companyPhone) {
        setError('companyPhone', { 
          type: 'manual', 
          message: 'El teléfono es requerido' 
        });
        isValid = false;
      }
      if (!values.companyDept) {
        setError('companyDept', { 
          type: 'manual', 
          message: 'El departamento es requerido' 
        });
        isValid = false;
      }
      if (!values.companyCity) {
        setError('companyCity', { 
          type: 'manual', 
          message: 'La ciudad es requerida' 
        });
        isValid = false;
      }
      if (!values.companyAddress) {
        setError('companyAddress', { 
          type: 'manual', 
          message: 'La dirección es requerida' 
        });
        isValid = false;
      }
    } else if (role === 'seller' && personType === 'juridica' && step === 5) {
      // Validate representative info
      if (!values.repFirstName) {
        setError('repFirstName', { 
          type: 'manual', 
          message: 'Los nombres del representante son requeridos' 
        });
        isValid = false;
      }
      if (!values.repLastName) {
        setError('repLastName', { 
          type: 'manual', 
          message: 'Los apellidos del representante son requeridos' 
        });
        isValid = false;
      }
      if (!values.repIdType) {
        setError('repIdType', { 
          type: 'manual', 
          message: 'El tipo de documento del representante es requerido' 
        });
        isValid = false;
      }
      if (!values.repIdNumber) {
        setError('repIdNumber', { 
          type: 'manual', 
          message: 'El número de documento del representante es requerido' 
        });
        isValid = false;
      }
      if (!values.repPhone) {
        setError('repPhone', { 
          type: 'manual', 
          message: 'El teléfono del representante es requerido' 
        });
        isValid = false;
      }
      if (!values.repEmail) {
        setError('repEmail', { 
          type: 'manual', 
          message: 'El correo del representante es requerido' 
        });
        isValid = false;
      }
      if (values.repEmail !== values.repConfirmEmail) {
        setError('repConfirmEmail', { 
          type: 'manual', 
          message: 'Los correos no coinciden' 
        });
        isValid = false;
      }
    }

    if (isValid) {
    next();
    } else {
      showErrorToast('Por favor completa todos los campos requeridos correctamente');
    }
  };

  const onSubmit = async (data: any) => {
    // Clear any previous auth errors
    if (clearError) clearError();
    
    try {
      // Validar aceptación de términos y privacidad antes de enviar
      if (!data.acceptTerms || !data.acceptPrivacy) {
        const errorMessage =
          'Debes aceptar los términos y condiciones, y las políticas de privacidad';
        showErrorToast(errorMessage);
        return;
      }

      // Validar selección de facturación electrónica
      if (
        data.electronicBilling === null ||
        data.electronicBilling === undefined
      ) {
        const errorMessage =
          'Debes seleccionar una opción de facturación electrónica';
        showErrorToast(errorMessage);
        return;
      }

      // Convertir electronicBilling a boolean
      const processedData = {
        ...data,
        electronicBilling: data.electronicBilling === 'true',
        storeCategoryIds: data.storeCategory ? [data.storeCategory] : [],
      };

      await registerUser(processedData);
      showSuccessToast(TOAST_MESSAGES.REGISTER_SUCCESS_WITH_EMAIL, {
        duration: 10000,
      });

      router.push(ROUTES.LOGIN);
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage =
        err instanceof Error ? err.message : TOAST_MESSAGES.REGISTER_ERROR;
      
      // Set form error on password field if it's a password-related error
      if (errorMessage.toLowerCase().includes('contraseña') || errorMessage.toLowerCase().includes('password')) {
        setError('password', {
          type: 'manual',
          message: errorMessage,
        });
      } else {
        // For other errors, show toast
        showErrorToast(errorMessage);
      }
    }
  };

  return (
    <Card className="bg-white rounded-lg border border-gray-200 shadow-sm w-full max-w-4xl animate-fade-in shadow-lg border-primary-200">
      <div className="px-6 py-4 border-b border-gray-200 animate-slide-up">
        <h1 className="text-2xl font-bold text-center text-primary-700">
            {step === 1 && 'Crear cuenta'}
            {step === 2 && role === 'seller' && 'Crear cuenta de vendedor'}
            {step >= 2 && role === 'buyer' && 'Crear cuenta'}
            {step >= 3 && role === 'seller' && 'Crear cuenta de vendedor'}
          </h1>
        {step === 1 && (
          <p className="text-center text-gray-600 mt-2">
            ¿Qué tipo de cuenta deseas crear?
          </p>
        )}
        {((role === 'buyer' && step >= 2) ||
          (role === 'seller' && step >= 3)) && (
          <p className="text-center text-gray-600 mt-2 mb-2">
              {role
                ? `Paso ${getAdjustedStep()} de ${getAdjustedTotalSteps()} - ${
                    role === 'seller'
                      ? personType === 'natural'
                        ? 'Vendedor Natural'
                        : personType === 'juridica'
                          ? 'Vendedor Jurídico'
                          : 'Vendedor'
                      : 'Comprador'
                  }`
                : ''}
            </p>
          )}
        {step === 2 && role === 'seller' && (
          <p className="text-center text-gray-600 mt-2">
            ¿Cómo quieres registrarte?
          </p>
        )}

        {/* Progress Bar */}
        <div
          className={`overflow-hidden transition-all duration-800 ${
            (role === 'buyer' && step >= 2) || (role === 'seller' && step >= 3)
              ? 'max-h-16 opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-0'
          }`}
        >
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${(getAdjustedStep() / getAdjustedTotalSteps()) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Inicio</span>
            <span>
              {Math.round((getAdjustedStep() / getAdjustedTotalSteps()) * 100)}%
              completado
            </span>
            <span>Finalizar</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Step 1: Account type selection */}
            {step === 1 && (
              <AccountTypeSelector
                register={register}
                watch={watch}
                next={next}
                setValue={setValue}
              />
            )}

            {/* Buyer: Step 2 - Personal info */}
            {step === 2 && role === 'buyer' && (
              <BuyerStep1PersonalInfo
                register={register}
                errors={errors}
                back={back}
                next={_handleNext}
                watch={watch}
              />
            )}

            {/* Buyer: Step 3 - Credentials (now step 3 in total, but step 2 for buyer) */}
            {step === 3 && role === 'buyer' && (
              <BuyerStep3Credentials
                register={register}
                errors={errors}
                watch={watch}
                back={back}
                isLoading={isLoading}
              />
            )}

            {/* Step 2: Seller person type selection */}
            {step === 2 && role === 'seller' && (
              <Step1PersonType
                register={register}
                watch={watch}
                back={back}
                next={next}
                setValue={setValue}
              />
            )}

            {/* Step 3: Store info (for both natural and juridica) */}
            {step === 3 && role === 'seller' && (
              <Step2StoreInfo
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                departments={departments}
                storeCities={storeCities}
                loadingGeo={loadingGeo}
                storeDept={storeDept}
                back={back}
                next={_handleNext}
              />
            )}

            {/* Natural Person Steps */}
            {step === 4 && role === 'seller' && personType === 'natural' && (
              <NaturalStep2PersonalInfo
                register={register}
                errors={errors}
                watch={watch}
                departments={departments}
                personalCities={personalCities}
                loadingGeo={loadingGeo}
                personalDept={personalDept}
                back={back}
                next={_handleNext}
              />
            )}

            {step === 5 && role === 'seller' && personType === 'natural' && (
              <NaturalStep3Credentials
                register={register}
                errors={errors}
                watch={watch}
                back={back}
                isLoading={isLoading}
              />
            )}

            {/* Juridica Person Steps */}
            {step === 4 && role === 'seller' && personType === 'juridica' && (
              <JuridicaStep2CompanyInfo
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                departments={departments}
                companyCities={companyCities}
                loadingGeo={loadingGeo}
                companyDept={companyDept}
                back={back}
                next={_handleNext}
              />
            )}

            {step === 5 && role === 'seller' && personType === 'juridica' && (
              <JuridicaStep3Representative
                register={register}
                errors={errors}
                watch={watch}
                back={back}
                next={_handleNext}
              />
            )}

            {step === 6 && role === 'seller' && personType === 'juridica' && (
              <JuridicaStep4Credentials
                register={register}
                errors={errors}
                watch={watch}
                back={back}
                isLoading={isLoading}
              />
            )}
        </form>
      </div>

      {step === 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 overflow-hidden rounded-b-lg animate-slide-up">
          <p className="text-center text-sm text-gray-600">
            <span className="font-bold">¿Ya tienes una cuenta? </span>
            <Link
              href={ROUTES.LOGIN}
              className="text-primary-600 hover:underline hover:text-primary-700 transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      )}
    </Card>
  );
}

