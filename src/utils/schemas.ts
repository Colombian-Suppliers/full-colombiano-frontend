import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#*.\-/]).{10,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .email('Email invalido')
    .regex(emailRegex, 'El formato del correo electronico no es valido'),
  password: z
    .string()
    .min(10, 'La contrasena debe tener al menos 10 caracteres')
    .regex(
      passwordRegex,
      'La contrasena debe tener al menos 1 mayuscula, 1 numero y 1 caracter especial'
    ),
});
