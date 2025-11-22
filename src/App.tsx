import QRCode from 'qrcode';
import { useState } from 'react';

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
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => generateQR(text)}>generate QR code</button>

      <div>
        {qrPath?.length > 0 ? (
          <>
            <img src={qrPath} alt="" />{' '}
            <button onClick={() => downloadPNG(qrPath)}>
              download QR code
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
