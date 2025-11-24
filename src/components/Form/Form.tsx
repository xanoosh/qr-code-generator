import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

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

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import type { QRCodeOptionsInterface } from '@/interfaces';

export default function Form({
  generateQR,
}: {
  generateQR: (text: string, options?: QRCodeOptionsInterface) => void;
}) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      'qr-code-value': '',
      'qr-code-margin': 1,
      'error-correction-level': 'M',
      'image-format': 'image/png',
    },
  });
  const [data, setData] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit((data) => {
          setData(JSON.stringify(data));
          generateQR(data['qr-code-value'], {
            errorCorrectionLevel: data['error-correction-level'],
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
                  render={({ field }) => (
                    <Input
                      required={true}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
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
                  render={({ field }) => (
                    <Input
                      type="number"
                      min={0}
                      max={20}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="error-correction-level">
                  Error correction level
                </FieldLabel>
                <Controller
                  name="error-correction-level"
                  control={control}
                  render={({ field }) => (
                    <Combobox
                      value={field.value}
                      onValueChange={field.onChange}
                      onBlur={field.onBlur}
                      list={errorCorrectionLevels}
                    />
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
                  render={({ field }) => (
                    <Combobox
                      value={field.value}
                      onValueChange={field.onChange}
                      onBlur={field.onBlur}
                      list={imageFormats}
                    />
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
          </Field>
          {data ? <p>{data}</p> : null}
        </FieldGroup>
      </form>
    </div>
  );
}
