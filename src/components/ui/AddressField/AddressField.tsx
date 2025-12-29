// @ts-nocheck
import React from 'react';import { UseFormRegister } from 'react-hook-form';
import { Input } from '../Input';

export interface AddressFieldProps {
  register: UseFormRegister<any>;
  fieldName?: string;
  label?: string;
  required?: boolean;
}

export const AddressField = ({
  register,
  fieldName = 'address',
  label = 'Dirección',
  required = false,
}: AddressFieldProps) => {
  return (
    <div className="space-y-2">
      <Input
        label={label}
        placeholder="Calle 77 #77-77"
        {...register(fieldName)}
        required={required}
      />

      <Input
        label="Edificio / Conjunto / Apartamento (opcional)"
        placeholder="Edificio Los Nogales, Apt. 777"
        {...register(`${fieldName}Line2`)}
      />
    </div>
  );
};

AddressField.displayName = 'AddressField';


export default AddressField;
