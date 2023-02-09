import { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import styles from './index.module.css';

const Switcher = ({
  onChange,
  name,
  isOn,
}: {
  onChange: (v: boolean) => void;
  name: string;
  isOn?: boolean;
}) => {
  const type = useStore((state) => state.type);

  useEffect(() => {
    if (typeof isOn === 'boolean') {
      setIsRight(isOn);
    }
  }, [isOn]);
  const [isRight, setIsRight] = useState(false);
  return (
    <div className={styles['container']}>
      <span
        onClick={() => {
          onChange(!isRight);
          setIsRight(!isRight);
        }}
        className={`${styles['slider']} ${isRight ? styles['slider-right'] : ''}`}
      >
        {type}
      </span>
      <input type="checkbox" checked={isRight} onChange={() => {}} name={name} />
    </div>
  );
};

export default Switcher;
