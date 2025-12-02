import { useQrStore } from '@/store/useQrStore';

export const downloadQr = (filename?: string) => {
  const dataUrl = useQrStore.getState().qrPath;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || 'qrcode';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
