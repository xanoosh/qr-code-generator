import { create } from 'zustand';

interface qrStoreInterface {
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  qrPath: string;
  setQrPath: (value: string) => void;
}

export const useQrStore = create<qrStoreInterface>((set) => ({
  dialogOpen: false,
  setDialogOpen: (value) => set(() => ({ dialogOpen: value })),
  qrPath: '',
  setQrPath: (value) => set(() => ({ qrPath: value })),
}));
