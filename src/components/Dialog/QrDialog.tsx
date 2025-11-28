import { useQrStore } from '@/store/useQrStore';
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
        <DialogContent className="sm:max-w-[425px] gap-8">
          <DialogHeader>
            <DialogTitle>Your QR code is ready!</DialogTitle>
            <DialogDescription>Click the button to download.</DialogDescription>
          </DialogHeader>
          {qrPath?.length > 0 ? (
            <img
              src={qrPath}
              alt="qr code"
              className="rounded-lg mx-auto w-40 h-40"
            />
          ) : null}
          <DialogFooter className="flex-row w-full gap-4 sm:justify-between justify-between">
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
