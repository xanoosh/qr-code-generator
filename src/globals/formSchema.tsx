import { z } from 'zod';

// Safe assumptions - code string length
// Level L (7% correction): 200 characters
// Level M (15% correction): 150 characters
// Level Q (25% correction): 100 characters
// Level H (30% correction): 80 characters

// declare schema unions
const schemaUnionLow = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(200, { message: 'Value is too long' }),
  'error-correction': z.literal(['L']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
});

const schemaUnionMedium = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(150, { message: 'Value is too long' }),
  'error-correction': z.literal(['M']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
});

const schemaUnionQuartile = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(100, { message: 'Value is too long' }),
  'error-correction': z.literal(['Q']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
});

const schemaUnionHigh = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(80, { message: 'Value is too long' }),
  'error-correction': z.literal(['H']),
  'qr-code-margin': z
    .number()
    .min(1, { message: 'Margin value is too low' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
});

// final schema with discriminatedUnion
export const formSchema = z.discriminatedUnion('error-correction', [
  schemaUnionLow,
  schemaUnionMedium,
  schemaUnionQuartile,
  schemaUnionHigh,
]);
