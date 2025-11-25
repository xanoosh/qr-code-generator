import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Combobox from './FormElements/Combobox';

const errorCorrectionLevels = [
  {
    value: 'L',
    label: 'Low',
  },
  {
    value: 'M',
    label: 'Medium',
  },
  {
    value: 'Q',
    label: 'Quartile',
  },
  {
    value: 'H',
    label: 'High',
  },
];

const imageFormats = [
  {
    value: 'image/png',
    label: 'png',
  },
  {
    value: 'image/jpeg',
    label: 'jpeg',
  },
  {
    value: 'image/webp',
    label: 'webp',
  },
];

//declare schema unions
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

//declare final schema
const schema = z.discriminatedUnion('error-correction', [
  schemaUnionLow,
  schemaUnionMedium,
  schemaUnionQuartile,
  schemaUnionHigh,
]);

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldError,
} from '@/components/ui/field';
import type { QRCodeOptionsInterface } from '@/interfaces';

export default function Form({
  generateQR,
}: {
  generateQR: (text: string, options?: QRCodeOptionsInterface) => void;
}) {
  type FormData = z.infer<typeof schema>;

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      'qr-code-value': '',
      'qr-code-margin': 1,
      'error-correction': 'M',
      'image-format': 'image/png',
    },
  });

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit((data) => {
          generateQR(data['qr-code-value'], {
            errorCorrectionLevel: data['error-correction'],
            margin: data['qr-code-margin'],
            type: data['image-format'],
          });
        })}
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="qr-code-value">
                  Set QR code value
                </FieldLabel>
                <Controller
                  name="qr-code-value"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      {error && <FieldError>{error.message}</FieldError>}
                    </>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="qr-code-margin">
                  Set QR code value
                </FieldLabel>
                <Controller
                  name="qr-code-margin"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        type="number"
                        min={0}
                        max={20}
                        value={field.value}
                        onChange={(e) => field.onChange(+e.target.value)}
                        onBlur={field.onBlur}
                      />
                      {error && <FieldError>{error.message}</FieldError>}
                    </>
                  )}
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="error-correction">
                  Error correction level
                </FieldLabel>
                <Controller
                  name="error-correction"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Combobox
                        value={field.value}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        list={errorCorrectionLevels}
                      />
                      {error && <FieldError>{error.message}</FieldError>}
                    </>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="image-format">
                  Select image format
                </FieldLabel>
                <Controller
                  name="image-format"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Combobox
                        value={field.value}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        list={imageFormats}
                      />
                      {error && <FieldError>{error.message}</FieldError>}
                    </>
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
