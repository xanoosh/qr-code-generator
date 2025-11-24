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
