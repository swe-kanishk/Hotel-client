import {create} from 'zustand';
import useRegisterModal from './useRegisterModal';

const useRentModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useRentModal;