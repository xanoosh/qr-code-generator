import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateQR } from '@/globals/utils';
//components
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import FormElement from '@/components/Form/FormElement/FormElement';
//form data
import { formSchema } from '@/globals/formSchema';
import { errorCorrectionLevels, imageFormats } from '@/globals/formSelectData';
//form type
import type { FormDataType } from '@/types';

export default function QrForm() {
  const { control, reset, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'qr-code-value': '',
      'qr-code-margin': 1,
      'error-correction': 'M',
      'image-format': 'svg',
    },
  });

  return (
    <div className="w-full max-w-md">
      <form
        id="qr-generator-form"
        onSubmit={handleSubmit((data) => generateQR(data))}
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
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
            </FieldGroup>
            <FieldGroup>
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
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal" className="justify-between">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset to default
            </Button>
            <Button type="submit" form="qr-generator-form">
              Generate QR
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
