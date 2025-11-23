import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function QrDialog({
  open,
  setOpen,
  qrPath,
  setQrPath,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  qrPath: string;
  setQrPath: (qrPath: string) => void;
}) {
  //download qr
  function downloadQR(dataUrl: string, filename?: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename || 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px] bg-slate-100">
          <DialogHeader>
            <DialogTitle>Your QR Code</DialogTitle>
            <DialogDescription>
              Click on the button below to download your QR code.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <img
              src={qrPath}
              alt="qr code"
              className="rounded-lg mx-auto w-40 h-40"
            />
          </div>
          <DialogFooter className="flex-col gap-2 sm:justify-between">
            <DialogClose asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setQrPath('');
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              type="submit"
              onClick={() => downloadQR(qrPath)}
            >
              Download Qr Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
