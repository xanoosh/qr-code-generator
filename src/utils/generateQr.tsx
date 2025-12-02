import QRCode from 'qrcode';
import { useQrStore } from '@/store/useQrStore';
import { createRoundedModulePath } from '@/utils/createRoundedModulePath';
import { calculateModulePosition } from './calculateModulePosition';

import type {
  FormDataType,
  QRCodeVectorOptionsInterface,
  QRCodeRasterOptionsInterface,
} from '@/types';

export const generateQr = async (data: FormDataType) => {
  const qrValue = data['qr-code-value'];
  const setQrPath = useQrStore.getState().setQrPath;
  const setDialogOpen = useQrStore.getState().setDialogOpen;
  // generate vector link
  if (data['image-format'] === 'svg') {
    const options: QRCodeVectorOptionsInterface = {
      errorCorrectionLevel: data['error-correction'],
      type: data['image-format'],
      margin: data['qr-code-margin'],
    };
    try {
      // const svgString = await QRCode.toString(qrValue, {
      //   ...options,
      // });
      const svgString = createRoundedQR(qrValue, options);
      const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
      setQrPath(svgUrl);
      setDialogOpen(true);
    } catch (err) {
      console.error(err);
    }
  }
  // generate raster link
  else {
    const options: QRCodeRasterOptionsInterface = {
      errorCorrectionLevel: data['error-correction'],
      type: data['image-format'],
      margin: data['qr-code-margin'],
    };
    try {
      const qrUrl = await QRCode.toDataURL(qrValue, { ...options });
      setQrPath(qrUrl);
      setDialogOpen(true);
    } catch (err) {
      console.error(err);
    }
  }
};

// proper rounded qr
const createRoundedQR = (
  qrValue: string,
  options: QRCodeVectorOptionsInterface
) => {
  const dark = 'black';
  const light = 'white';

  const qrObject = QRCode.create(qrValue, options);
  const count = qrObject.modules.size;
  const isDark = (x: number, y: number) => qrObject.modules.get(x, y);

  const rects: string[] = [];
  const maskCuts: string[] = [];
  const r = 0.4;

  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      if (!isDark(x, y)) continue;
      const { xPos, yPos, w, h } = calculateModulePosition(x, y, isDark);
      rects.push(
        `<rect
          x="${xPos}"
          y="${yPos}"
          width="${w}"
          height="${h}"
          fill="${dark}"
        />`
      );
      const cornerPaths = createRoundedModulePath({ x, y, isDark, r });
      for (const d of cornerPaths) {
        maskCuts.push(`<path d="${d}" fill="black" />`);
      }
    }
  }
  return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${count} ${count}">
            <defs>
              <mask id="qr-mask" maskUnits="userSpaceOnUse">
                <rect x="0" y="0" width="${count}" height="${count}" fill="white" />
                ${maskCuts.join('\n')}
              </mask>
            </defs>
            <rect x="0" y="0" width="${count}" height="${count}" fill="${light}" />
            <g mask="url(#qr-mask)">
              ${rects.join('\n')}
            </g>
          </svg>`;
};
