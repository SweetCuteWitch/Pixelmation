import { create } from 'zustand';
import { EditorMode, SizeType, TextureType } from '../types';

interface Store {
  size: SizeType;
  type: EditorMode;
  currentColor: string;
  currentTexture: TextureType;
  setSize: (data: SizeType) => void;
  changeType: () => void;
  setCurrentColor: (data: string) => void;
  setCurrentTexture: (data: TextureType) => void;
}

export const useStore = create<Store>()((set) => ({
  size: { width: 10, height: 10 },
  type: 'texture',
  currentColor: '#000000',
  currentTexture: {
    name: '',
    cells: [],
  },
  setSize: (data: SizeType) => set(() => ({ size: data })),
  changeType: () =>
    set((state) => ({
      type: state.type === 'texture' ? 'animation' : 'texture',
    })),
  setCurrentColor: (data: string) => set(() => ({ currentColor: data })),
  setCurrentTexture: (data: TextureType) => set(() => ({ currentTexture: data })),
}));
