/**
 * ZOD VALIDATION SCHEMA IMPLEMENTATION
 * 
 * Zod es una librería de validación de esquemas para TypeScript que permite definir
 * y validar estructuras de datos con un enfoque declarativo y type-safe.
 * 
 * Características clave:
 * 1. Type-safe: Los esquemas generan tipos TypeScript automáticamente
 * 2. Declarativo: Sintaxis sencilla y legible
 * 3. Validación completa: Soporta strings, números, objetos, arrays, etc.
 * 4. Mensajes personalizables: Permite definir mensajes de error específicos
 * 5. Composible: Los esquemas pueden combinarse y extenderse fácilmente
 * 
 * En este archivo vamos implementar dos esquemas:
 * - registerSchema: Para validar datos de registro de usuario
 * - loginSchema: Para validar credenciales de inicio de sesión
 * 
 * Cada campo tiene validaciones específicas con mensajes de error personalizados
 * que se mostrarán si la validación falla.
 */

import {z} from "zod";

export const registerSchema = z.object({
    username: z
    .string({required_error: "Username is required"}),

    email: z
    .string({required_error})
    .email({ pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i}, {message:"Invalid Email"}),
  

    password: z
    .string({required_error: "Password is required"})
    .min(6, {message:"Password must be al least 6 characters"})
    .max(18, {message: "Password must be al least 18 characters"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {message: "Invalid password"})
})