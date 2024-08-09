import {create} from 'zustand';
const useImageGalleryModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useImageGalleryModal;