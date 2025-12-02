import { z } from 'zod';

// declare schema unions
const schemaUnionLow = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(200, { message: 'Value is too long' }),
  'error-correction': z.literal(['L']),
  'qr-code-margin': z
    .number()
    .min(0, { message: 'Margin value cannot be negative' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
  'rounded-corners': z.number().min(0).max(0.5),
});

const schemaUnionMedium = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(150, { message: 'Value is too long' }),
  'error-correction': z.literal(['M']),
  'qr-code-margin': z
    .number()
    .min(0, { message: 'Margin value cannot be negative' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
  'rounded-corners': z.number().min(0).max(0.5),
});

const schemaUnionQuartile = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(100, { message: 'Value is too long' }),
  'error-correction': z.literal(['Q']),
  'qr-code-margin': z
    .number()
    .min(0, { message: 'Margin value cannot be negative' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
  'rounded-corners': z.number().min(0).max(0.5),
});

const schemaUnionHigh = z.object({
  'qr-code-value': z
    .string()
    .min(1, { message: 'Value must not be empty' })
    .max(80, { message: 'Value is too long' }),
  'error-correction': z.literal(['H']),
  'qr-code-margin': z
    .number()
    .min(0, { message: 'Margin value cannot be negative' })
    .max(20, { message: 'Margin value is too high' }),
  'image-format': z.enum(['image/png', 'image/jpeg', 'image/webp', 'svg']),
  'rounded-corners': z.number().min(0).max(0.5),
});

// final schema with discriminatedUnion
export const formSchema = z.discriminatedUnion('error-correction', [
  schemaUnionLow,
  schemaUnionMedium,
  schemaUnionQuartile,
  schemaUnionHigh,
]);
