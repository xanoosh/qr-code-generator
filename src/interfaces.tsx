import type { Control } from 'react-hook-form';
import { formSchema } from './components/Form/FormSchema';
import { z } from 'zod';

export type FormDataType = z.infer<typeof formSchema>;
type InputName = keyof FormDataType;

export interface FormElementInterface {
  control: Control<FormDataType>;
  variant: 'text' | 'number' | 'select';
  name: InputName;
  label: string;
  options?: { label: string; value: string }[];
}

export interface QRCodeOptionsInterface {
  maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  version?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  type?: 'image/png' | 'image/jpeg' | 'image/webp';
  quality?: number;
  margin?: number;
  color?: {
    dark: string;
    light: string;
  };
}
