import { describe, it, expect } from 'vitest';
import {
  validateDocument,
  validateEmail,
  validateEmailMatch,
  validatePassword,
  validatePasswordMatch,
  validatePhone,
  validateFirstName,
  validateLastName,
} from './validations';

describe('Document Validation', () => {
  describe('validateDocument - CC (Cédula de Ciudadanía)', () => {
    it('accepts valid CC numbers', () => {
      expect(validateDocument('CC', '1234567890')).toBe(true);
      expect(validateDocument('CC', '123456789')).toBe(true);
      expect(validateDocument('CC', '12345678')).toBe(true);
    });

    it('rejects CC with letters', () => {
      expect(validateDocument('CC', '123456789A')).toContain('solo debe contener números');
    });

    it('rejects CC with invalid length', () => {
      expect(validateDocument('CC', '1234567')).toContain('debe tener entre 8 y 10 dígitos');
      expect(validateDocument('CC', '12345678901')).toContain('debe tener entre 8 y 10 dígitos');
    });

    it('rejects CC with special characters', () => {
      expect(validateDocument('CC', '123-456-789')).toContain('solo debe contener números');
    });
  });

  describe('validateDocument - CE (Cédula de Extranjería)', () => {
    it('accepts valid CE numbers', () => {
      expect(validateDocument('CE', '1234567')).toBe(true);
      expect(validateDocument('CE', '123456')).toBe(true);
    });

    it('rejects CE with invalid length', () => {
      expect(validateDocument('CE', '12345')).toContain('debe tener entre 6 y 7 dígitos');
      expect(validateDocument('CE', '12345678')).toContain('debe tener entre 6 y 7 dígitos');
    });
  });

  describe('validateDocument - PASSPORT', () => {
    it('accepts valid passport numbers', () => {
      expect(validateDocument('PASSPORT', 'AB123456')).toBe(true);
      expect(validateDocument('PASSPORT', 'A1234567')).toBe(true);
      expect(validateDocument('PASSPORT', 'ABC12345')).toBe(true);
    });

    it('rejects passport with invalid format', () => {
      expect(validateDocument('PASSPORT', '12345678')).toContain('debe contener letras y números');
      expect(validateDocument('PASSPORT', 'ABCDEFGH')).toContain('debe contener letras y números');
    });

    it('rejects passport with invalid length', () => {
      expect(validateDocument('PASSPORT', 'AB12345')).toContain('debe tener entre 8 y 9 caracteres');
      expect(validateDocument('PASSPORT', 'AB1234567')).toContain('debe tener entre 8 y 9 caracteres');
    });
  });

  describe('validateDocument - NIT', () => {
    it('accepts valid NIT numbers', () => {
      expect(validateDocument('NIT', '900123456-7')).toBe(true);
      expect(validateDocument('NIT', '9001234567')).toBe(true);
    });

    it('rejects NIT with invalid format', () => {
      expect(validateDocument('NIT', 'ABC123456')).toContain('debe tener el formato');
    });
  });
});

describe('Email Validation', () => {
  it('accepts valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    expect(validateEmail('test_123@domain.com')).toBe(true);
  });

  it('rejects invalid email formats', () => {
    expect(validateEmail('invalid')).toContain('correo electrónico no es válido');
    expect(validateEmail('test@')).toContain('correo electrónico no es válido');
    expect(validateEmail('@example.com')).toContain('correo electrónico no es válido');
    expect(validateEmail('test @example.com')).toContain('correo electrónico no es válido');
  });

  it('detects common typos in email domains', () => {
    expect(validateEmail('test@gmial.com')).toContain('¿Quisiste decir');
    expect(validateEmail('test@gmai.com')).toContain('¿Quisiste decir');
    expect(validateEmail('test@hotmial.com')).toContain('¿Quisiste decir');
  });

  it('rejects disposable email domains', () => {
    expect(validateEmail('test@tempmail.com')).toContain('no se permiten correos temporales');
    expect(validateEmail('test@10minutemail.com')).toContain('no se permiten correos temporales');
  });
});

describe('Email Match Validation', () => {
  it('returns true when emails match', () => {
    expect(validateEmailMatch('test@example.com', 'test@example.com')).toBe(true);
  });

  it('returns error when emails do not match', () => {
    expect(validateEmailMatch('test@example.com', 'different@example.com')).toContain(
      'correos electrónicos no coinciden'
    );
  });

  it('is case-insensitive', () => {
    expect(validateEmailMatch('Test@Example.com', 'test@example.com')).toBe(true);
  });
});

describe('Password Validation', () => {
  it('accepts strong passwords', () => {
    expect(validatePassword('SecurePass123!')).toBe(true);
    expect(validatePassword('MyP@ssw0rd2024')).toBe(true);
    expect(validatePassword('C0mpl3x!Pass')).toBe(true);
  });

  it('rejects passwords shorter than 10 characters', () => {
    expect(validatePassword('Short1!')).toContain('debe tener al menos 10 caracteres');
  });

  it('rejects passwords without uppercase letters', () => {
    expect(validatePassword('lowercase123!')).toContain('debe contener al menos una letra mayúscula');
  });

  it('rejects passwords without lowercase letters', () => {
    expect(validatePassword('UPPERCASE123!')).toContain('debe contener al menos una letra minúscula');
  });

  it('rejects passwords without numbers', () => {
    expect(validatePassword('NoNumbers!')).toContain('debe contener al menos un número');
  });

  it('rejects passwords without special characters', () => {
    expect(validatePassword('NoSpecial123')).toContain('debe contener al menos un carácter especial');
  });

  it('rejects common passwords', () => {
    expect(validatePassword('Password123!')).toContain('contraseña es muy común');
    expect(validatePassword('Qwerty123!')).toContain('contraseña es muy común');
  });

  it('rejects sequential patterns', () => {
    expect(validatePassword('Abcd1234!@')).toContain('no debe contener secuencias');
    expect(validatePassword('Pass123456!')).toContain('no debe contener secuencias');
  });

  it('rejects repeated characters', () => {
    expect(validatePassword('Passsss123!')).toContain('no debe contener caracteres repetidos');
  });
});

describe('Password Match Validation', () => {
  it('returns true when passwords match', () => {
    expect(validatePasswordMatch('SecurePass123!', 'SecurePass123!')).toBe(true);
  });

  it('returns error when passwords do not match', () => {
    expect(validatePasswordMatch('SecurePass123!', 'DifferentPass123!')).toContain(
      'contraseñas no coinciden'
    );
  });
});

describe('Phone Validation', () => {
  it('accepts valid Colombian mobile numbers', () => {
    expect(validatePhone('3001234567')).toBe(true);
    expect(validatePhone('3101234567')).toBe(true);
    expect(validatePhone('3201234567')).toBe(true);
  });

  it('accepts valid Colombian landline numbers', () => {
    expect(validatePhone('6012345678')).toBe(true); // Bogotá
    expect(validatePhone('6042345678')).toBe(true); // Medellín
  });

  it('accepts formatted phone numbers', () => {
    expect(validatePhone('300-123-4567')).toBe(true);
    expect(validatePhone('(300) 123-4567')).toBe(true);
    expect(validatePhone('+57 300 123 4567')).toBe(true);
  });

  it('rejects invalid phone numbers', () => {
    expect(validatePhone('123')).toContain('número de teléfono no es válido');
    expect(validatePhone('9001234567')).toContain('número de teléfono no es válido');
  });
});

describe('Name Validation', () => {
  describe('validateFirstName', () => {
    it('accepts valid first names', () => {
      expect(validateFirstName('Juan')).toBe(true);
      expect(validateFirstName('María José')).toBe(true);
      expect(validateFirstName('José María')).toBe(true);
    });

    it('accepts names with accents', () => {
      expect(validateFirstName('José')).toBe(true);
      expect(validateFirstName('María')).toBe(true);
      expect(validateFirstName('Andrés')).toBe(true);
    });

    it('rejects names with numbers', () => {
      expect(validateFirstName('Juan123')).toContain('solo debe contener letras');
    });

    it('rejects names with special characters', () => {
      expect(validateFirstName('Juan@')).toContain('solo debe contener letras');
    });

    it('rejects names that are too short', () => {
      expect(validateFirstName('J')).toContain('debe tener al menos 2 caracteres');
    });

    it('rejects names that are too long', () => {
      expect(validateFirstName('A'.repeat(51))).toContain('no debe exceder 50 caracteres');
    });
  });

  describe('validateLastName', () => {
    it('accepts valid last names', () => {
      expect(validateLastName('García')).toBe(true);
      expect(validateLastName('Pérez López')).toBe(true);
      expect(validateLastName('De la Cruz')).toBe(true);
    });

    it('accepts compound last names', () => {
      expect(validateLastName('García Márquez')).toBe(true);
      expect(validateLastName('De la Hoz')).toBe(true);
    });

    it('rejects last names with numbers', () => {
      expect(validateLastName('García123')).toContain('solo debe contener letras');
    });

    it('rejects last names that are too short', () => {
      expect(validateLastName('G')).toContain('debe tener al menos 2 caracteres');
    });
  });
});

