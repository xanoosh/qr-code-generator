import { useQrStore } from '@/store/useQrStore';
import type {
  FormDataType,
  QRCodeVectorOptionsInterface,
  QRCodeRasterOptionsInterface,
} from '@/types';
import QRCode from 'qrcode';

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

// new type (all img options included)
import type { QRCodeOptionsInterfaceNew } from '@/types';
import { createRoundedModulePath } from './createRoundedModulePath';

// export const generateQrNew = async (data: FormDataType) => {
//   //qr state methods
//   const setQrPath = useQrStore.getState().setQrPath;
//   const setDialogOpen = useQrStore.getState().setDialogOpen;
//   //parse qr data
//   const qrValue = data['qr-code-value'];
//   const options: QRCodeOptionsInterfaceNew = {
//     errorCorrectionLevel: data['error-correction'],
//     type: data['image-format'],
//     margin: data['qr-code-margin'],
//   };
// };

// qr with dots
// const createDottedQR = (
//   qrValue: string,
//   options: QRCodeOptionsInterfaceNew
// ) => {
//   const radius = 0.4; // placeholder
//   const dark = 'black'; // placeholder
//   const light = 'white'; // placeholder
//   // create modules
//   const qrObject = QRCode.create(qrValue, options);
//   const count = qrObject.modules.size;
//   const isDark = (x: number, y: number) => qrObject.modules.get(x, y);
//   const circles = [];
//   for (let y = 0; y < count; y++) {
//     for (let x = 0; x < count; x++) {
//       if (!isDark(x, y)) continue;

//       circles.push(
//         `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="${radius}" fill="${dark}"/>`
//       );
//     }
//   }
//   return `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${count} ${count}">
//     <rect x="0" y="0" width="${count}" height="${count}" fill="${light}"/>
//     ${circles.join('\n  ')}
//   </svg>`;
// };

// proper rounded qr
const createRoundedQR = (
  qrValue: string,
  options: QRCodeOptionsInterfaceNew
) => {
  const dark = 'black'; // placeholder
  const light = 'white'; // placeholder
  // create modules
  const qrObject = QRCode.create(qrValue, options);
  const count = qrObject.modules.size;
  const isDark = (x: number, y: number) => qrObject.modules.get(x, y);
  const paths = [];
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      if (!isDark(x, y)) continue;
      const topEmpty = !isDark(x, y - 1);
      const rightEmpty = !isDark(x + 1, y);
      const bottomEmpty = !isDark(x, y + 1);
      const leftEmpty = !isDark(x - 1, y);

      const pathArgs = {
        x,
        y,
        edges: {
          topEmpty,
          rightEmpty,
          bottomEmpty,
          leftEmpty,
        },
      };

      const d = createRoundedModulePath(pathArgs);

      paths.push(`<path d="${d}" fill="${dark}" />`);
    }
  }
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${count} ${count}">
    <rect x="0" y="0" width="${count}" height="${count}" fill="${light}"/>
    ${paths.join('\n  ')}
  </svg>`;
};
