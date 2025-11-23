import QRCode from 'qrcode';
import { useState } from 'react';

import QrForm from './components/QrForm';
import QrDialog from './components/QrDialog';

function App() {
  const [qrText, setQrText] = useState<string>('');
  const [dialogOpen, setDalogOpen] = useState<boolean>(false);
  const [qrPath, setQrPath] = useState<string>('');

  // generate qr
  const generateQR = async (text: string) => {
    try {
      const qrUrl = await QRCode.toDataURL(text);
      setQrPath(qrUrl);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-slate-900">
      <QrForm
        qrText={qrText}
        setQrText={setQrText}
        generateQR={generateQR}
        setOpen={setDalogOpen}
      />
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
