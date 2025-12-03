import type { Control } from 'react-hook-form';
import { formSchema } from './globals/formSchema';
import { z } from 'zod';

//Store types

type Theme = 'light' | 'dark' | 'system';
export type ThemeStoreType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type qrStoreType = {
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  qrPath: string;
  setQrPath: (value: string) => void;
};

//component types

// form types
export type FormDataType = z.infer<typeof formSchema>;

type InputName = keyof FormDataType;
export interface FormElementInterface {
  control: Control<FormDataType>;
  variant: 'slider' | 'text' | 'number' | 'select';
  name: InputName;
  label: string;
  options?: { label: string; value: string; description?: string }[];
}

// QR generator option types
type QRCodeOptionsInterface = {
  maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  version?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  quality?: number;
  margin?: number;
  color?: {
    dark: string;
    light: string;
  };
};

export interface QRCodeRasterOptionsInterface extends QRCodeOptionsInterface {
  type: 'image/png' | 'image/jpeg' | 'image/webp';
}

export interface QRCodeVectorOptionsInterface extends QRCodeOptionsInterface {
  type: 'svg';
}

// component types
export type QrFormCardWrapperProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};
