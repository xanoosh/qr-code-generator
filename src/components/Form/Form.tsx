import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//components
import {
  Field,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import FormElement from './FormElement/FormElement';
//form data
import { schema } from './FormSchema';
import { errorCorrectionLevels, imageFormats } from './FormData';
//types
import type { QRCodeOptionsInterface } from '@/interfaces';
type FormData = z.infer<typeof schema>;

export default function Form({
  generateQR,
}: {
  generateQR: (text: string, options?: QRCodeOptionsInterface) => void;
}) {
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
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
