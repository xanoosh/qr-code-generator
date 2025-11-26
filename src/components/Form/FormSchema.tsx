import { z } from 'zod';

// declare schema unions
const schemaUnionLow = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(2, { message: 'Value is too long' }),
  'error-correction': z.literal(['L']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp']),
});

const schemaUnionMedium = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(3, { message: 'Value is too long' }),
  'error-correction': z.literal(['M']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp']),
});

const schemaUnionQuartile = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(4, { message: 'Value is too long' }),
  'error-correction': z.literal(['Q']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp']),
});

const schemaUnionHigh = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(5, { message: 'Value is too long' }),
  'error-correction': z.literal(['H']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp']),
});

// final schema with discriminatedUnion
export const formSchema = z.discriminatedUnion('error-correction', [
  schemaUnionLow,
  schemaUnionMedium,
  schemaUnionQuartile,
  schemaUnionHigh,
]);
