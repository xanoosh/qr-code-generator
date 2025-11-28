import { create } from 'zustand';
import type { qrStoreType } from '@/types';

export const useQrStore = create<qrStoreType>((set) => ({
  dialogOpen: false,
  setDialogOpen: (value) => set(() => ({ dialogOpen: value })),
  qrPath: '',
  setQrPath: (qrPath) => set(() => ({ qrPath })),
}));
