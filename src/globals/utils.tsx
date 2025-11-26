import type { QRCodeOptionsInterface } from '@/interfaces';
import QRCode from 'qrcode';
import { useQrStore } from '@/store/store';

// Generate qr fn
export const generateQR = async (
  text: string,
  options?: QRCodeOptionsInterface
) => {
  // const options = {
  //   errorCorrectionLevel: 'H',
  //   type: 'image/jpeg',
  //   quality: 0,
  //   margin: 1,
  //   color: {
  //     dark: '#010599FF',
  //     light: '#FFBF60FF',
  //   },
  // };

  const setQrPath = useQrStore.getState().setQrPath;
  const setDialogOpen = useQrStore.getState().setDialogOpen;

  try {
    const qrUrl = await QRCode.toDataURL(text, { ...options });
    setQrPath(qrUrl);
    setDialogOpen(true);
  } catch (err) {
    console.error(err);
  }
};

// Download qr fn
export const downloadQR = (filename?: string) => {
  const dataUrl = useQrStore.getState().qrPath;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || 'qrcode.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
