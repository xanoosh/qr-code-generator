import { useQrStore } from '@/store/store';
import { downloadQR } from '@/globals/utils';

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

export default function QrDialog() {
  const { qrPath, setDialogOpen, dialogOpen } = useQrStore();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px] bg-slate-100">
          <DialogHeader>
            <DialogTitle>Your QR Code</DialogTitle>
            <DialogDescription>
              Click on the button below to download your QR code.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {qrPath?.length > 0 ? (
              <img
                src={qrPath}
                alt="qr code"
                className="rounded-lg mx-auto w-40 h-40"
              />
            ) : null}
          </div>
          <DialogFooter className="flex-col gap-2 sm:justify-between">
            <DialogClose asChild>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              type="submit"
              onClick={() => downloadQR()}
            >
              Download Qr Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
