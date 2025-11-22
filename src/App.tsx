import QRCode from 'qrcode';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function App() {
  const [text, setText] = useState<string>('');
  const [qrPath, setQrPath] = useState<string>('');

  //download qr
  function downloadPNG(dataUrl: string, filename?: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename || 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
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
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-slate-800">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => generateQR(text)}>generate QR code</Button>

      <div>
        {qrPath?.length > 0 ? (
          <>
            <img src={qrPath} alt="" />{' '}
            <Button onClick={() => downloadPNG(qrPath)}>
              download QR code
            </Button>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default App;
