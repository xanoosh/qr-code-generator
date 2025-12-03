import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateQr } from '@/utils/generateQr';
//components
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import FormElement from '@/components/Form/FormElement/FormElement';
import QrFormCardWrapper from './FormCardWrapper/QrFormCardWrapper';
//form data
import { formSchema } from '@/globals/formSchema';
import { errorCorrectionLevels, imageFormats } from '@/globals/formSelectData';
//form type
import type { FormDataType } from '@/types';

export default function QrForm() {
  const { control, reset, handleSubmit, watch } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'qr-code-value': '',
      'qr-code-margin': 1,
      'error-correction': 'M',
      'image-format': 'svg',
      'rounded-corners': 0,
    },
  });
  const imageFormat = watch('image-format');

  return (
    <form
      id="qr-generator-form"
      onSubmit={handleSubmit((data) => generateQr(data))}
      className="flex justify-center flex-wrap gap-8 w-full"
    >
      <QrFormCardWrapper
        title="Generate QR code"
        description="Enter QR code value and adjust margin."
      >
        <FormElement
          control={control}
          variant="text"
          name="qr-code-value"
          label="Set QR code value"
        />
        <FormElement
          control={control}
          variant="number"
          name="qr-code-margin"
          label="Set QR code margin"
        />
      </QrFormCardWrapper>

      <QrFormCardWrapper
        title="Adjust additional parameters"
        description="Set error correction level,image format, corner radius."
      >
        <FormElement
          control={control}
          variant="select"
          name="error-correction"
          label="Error correction level"
          options={errorCorrectionLevels}
        />
        <FormElement
          control={control}
          variant="select"
          name="image-format"
          label="Select image format"
          options={imageFormats}
        />
        {imageFormat === 'svg' ? (
          <FormElement
            control={control}
            variant="slider"
            name="rounded-corners"
            label="Set corner radius"
          />
        ) : null}
        <Field orientation="horizontal" className="justify-between flex-wrap">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset to default
          </Button>
          <Button type="submit" form="qr-generator-form">
            Generate QR
          </Button>
        </Field>
      </QrFormCardWrapper>
    </form>
  );
}
