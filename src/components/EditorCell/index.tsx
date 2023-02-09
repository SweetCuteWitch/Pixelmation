import { useStore } from '../../store/store';
import styles from './index.module.css';

interface EditorCellProps {
  color?: string;
  isGridVisible: boolean;
  changeCell: (x: number, y: number) => void;
  copyColor: (x: number, y: number) => void;
  x: number;
  y: number;
}

const EditorCell = ({ color, isGridVisible, changeCell, copyColor, x, y }: EditorCellProps) => {
  const size = useStore((state) => state.size);
  const sizeParam =
    document.body.offsetWidth > document.body.offsetHeight
      ? document.body.offsetHeight
      : document.body.offsetWidth;
  return (
    <div
      className={styles['container']}
      style={{
        border: `${isGridVisible ? '0.5px solid #555' : 'none'}`,
        width: `${sizeParam / size.width / 10}${
          document.body.offsetWidth > document.body.offsetHeight ? 'vh' : 'vw'
        }`,
        height: `${sizeParam / size.height / 10}${
          document.body.offsetWidth > document.body.offsetHeight ? 'vh' : 'vw'
        }`,
        background: color,
      }}
      onClick={() => changeCell(x, y)}
      onContextMenu={(e) => {
        e.preventDefault();
        copyColor(x, y);
      }}
    >
      <div />
    </div>
  );
};

export default EditorCell;
