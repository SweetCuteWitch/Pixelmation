import { useEffect, useState, useRef } from 'react';
import { useStore } from '../../store/store';
import { EditorMode } from '../../types';
import EditorCell from '../EditorCell';
import styles from './index.module.css';

interface EditorAreaProps {
  mode: EditorMode;
}

const EditorArea = ({ mode }: EditorAreaProps) => {
  const { size, setSize, currentColor, setCurrentColor, currentTexture, setCurrentTexture } =
    useStore((state) => state);
  const [isGridVisible, setIsGridVisible] = useState(true);

  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentTexture.cells.length === 0) {
      const texture = new Array(size.height).fill(0).map(() => {
        return new Array(size.width).fill('transparent');
      });
      setCurrentTexture({
        name: '',
        cells: texture,
      });
    }
  }, [setCurrentTexture, size]);

  const changeCell = (x: number, y: number) => {
    currentTexture.cells[x][y] = currentColor;
    setCurrentTexture({
      name: '',
      cells: currentTexture.cells,
    });
  };

  const copyColor = (x: number, y: number) => {
    setCurrentColor(currentTexture.cells[x][y]);
  };

  const exportFile = () => {
    const filename = prompt('Enter texture name');
    if (filename !== null) {
      setCurrentTexture({
        name: filename,
        cells: currentTexture.cells,
      });
      setTimeout(() => {
        currentTexture.name = filename;
        const dataStr =
          'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentTexture));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', filename + '.json');
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }, 5);
    }
  };

  const importFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleFileData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              setCurrentTexture(JSON.parse(e.target.result as string));
              setSize({
                width: JSON.parse(e.target.result as string).cells.length,
                height: JSON.parse(e.target.result as string).cells[0].length,
              });
              console.log(size);
              
            }
          };
          reader.readAsText(file);
        } else {
          alert('File selected incorrectly');
        }
      }
    } else {
      alert('File selected incorrectly');
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['config']}>
        <div>{currentTexture.name}</div>
        <button onClick={importFile}>
          Load texture
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={handleFileData}
          />
        </button>
        <label>
          <input type="checkbox" defaultChecked onChange={() => setIsGridVisible(!isGridVisible)} />{' '}
          Enable grid
        </label>
        <input
          className={styles['color']}
          name="color"
          type="color"
          value={currentColor}
          onChange={(e) => {
            setCurrentColor(e.target.value);
          }}
        />
        <label onClick={() => setCurrentColor('transparent')}>Set transparent color</label>
        <button onClick={exportFile}>Save and export</button>
      </div>
      <div
        className={styles['content']}
        style={{
          gridTemplateColumns: `repeat(${size.width}, auto)`,
          gridTemplateRows: `repeat(${size.height}, auto)`,
        }}
      >
        {currentTexture.cells.map((row, rowId) => {
          return row.map((el, id) => {
            return (
              <EditorCell
                key={id}
                x={rowId}
                y={id}
                color={el}
                isGridVisible={isGridVisible}
                changeCell={changeCell}
                copyColor={copyColor}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default EditorArea;
