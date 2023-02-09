import { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import Switcher from '../Switcher/Switcher';

const FieldSelector = () => {
  const { size, setSize, type, changeType } = useStore((state) => state);

  const [x, setX] = useState(size.width);
  const [y, setY] = useState(size.height);

  const navigate = useNavigate();

  useEffect(() => {
    setSize({
      width: x,
      height: y,
    });
  }, [x, y, setSize]);

  const saveSize = () => {
    navigate(`/${type}`);
  };

  const changeParam = (value: number, setter: (number: number) => void) => {
    if (value > 75) {
      value = 75;
    }
    if (value <= 0) {
      value = 1;
    }
    setter(value);
  };

  return (
    <div className={styles['container']}>
      <Switcher name={'What to create?'} onChange={changeType} />
      <div>
        <div>Enter width</div>
        <input
          type="number"
          defaultValue={10}
          placeholder={`${x}`}
          onChange={(e) => changeParam(+e.target.value, setX)}
        />
      </div>
      <div>
        <div>Enter height</div>
        <input
          type="number"
          defaultValue={10}
          placeholder={`${y}`}
          onChange={(e) => changeParam(+e.target.value, setY)}
        />
      </div>
      <button onClick={saveSize}>Generate</button>
    </div>
  );
};

export default FieldSelector;
