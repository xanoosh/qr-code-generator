import QRCode from 'qrcode';
import { useState } from 'react';

import QrForm from './components/QrForm';
import QrDialog from './components/QrDialog';

function App() {
  const [dialogOpen, setDalogOpen] = useState<boolean>(false);
  const [qrPath, setQrPath] = useState<string>('');

  // generate qr
  const generateQR = async (text: string) => {
    interface QRCodeOptions {
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
    // options
    const options: QRCodeOptions = {
      // maskPattern: 0,
      // version: 1,
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0,
      margin: 1,
      color: {
        dark: '#010599FF',
        light: '#FFBF60FF',
      },
    };

    try {
      const qrUrl = await QRCode.toDataURL(text, { ...options });
      setQrPath(qrUrl);
      setDalogOpen(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-slate-900">
      <QrForm generateQR={generateQR} />
      <QrDialog
        open={dialogOpen}
        setOpen={setDalogOpen}
        qrPath={qrPath}
        setQrPath={setQrPath}
      />
    </main>
  );
}

export default App;
