export interface SizeType {
  width: number;
  height: number;
}

export type EditorMode = 'texture' | 'animation';

export interface TextureType {
  name: string;
  cells: string[][]; 
}